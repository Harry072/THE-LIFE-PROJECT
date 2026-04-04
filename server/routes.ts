import { Router } from 'express';
import { getDb } from './db.ts';
import { analyzeResponses, generateTasks, UserAnalysis } from './services.ts';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/onboarding', async (req, res) => {
  const { user_id, answers } = req.body;
  const db = await getDb();

  try {
    const user = await db.get('SELECT id FROM users WHERE id = ?', [user_id]);
    if (!user) {
      await db.run(
        'INSERT INTO users (id, email, full_name, user_type, main_problem, focus_score, discipline_score, sleep_score, purpose_score, onboarding_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [user_id, `${user_id}@example.com`, `User ${user_id.slice(0, 5)}`, '', '', 0, 0, 0, 0, false]
      );
    } else {
      await db.run('DELETE FROM onboarding_responses WHERE user_id = ?', [user_id]);
    }

    for (const ans of answers) {
      await db.run(
        'INSERT INTO onboarding_responses (user_id, question_key, answer) VALUES (?, ?, ?)',
        [user_id, ans.question_key, ans.answer]
      );
    }

    const analysis = analyzeResponses(answers);
    await db.run(
      'UPDATE users SET user_type = ?, main_problem = ?, focus_score = ?, discipline_score = ?, sleep_score = ?, purpose_score = ?, meaning = ?, direction = ?, insight = ?, onboarding_completed = ? WHERE id = ?',
      [
        analysis.userType,
        analysis.mainProblem,
        analysis.scores.focus,
        analysis.scores.discipline,
        analysis.scores.sleep,
        analysis.scores.purpose,
        analysis.meaning,
        analysis.direction,
        analysis.insight,
        true,
        user_id
      ]
    );

    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/analysis', async (req, res) => {
  const { user_id } = req.query;
  const db = await getDb();

  try {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [user_id]);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.onboarding_completed) {
      return res.status(400).json({ success: false, message: 'Onboarding not completed yet.' });
    }

    const analysis = {
      userType: user.user_type,
      mainProblem: user.main_problem,
      scores: {
        focus: user.focus_score,
        discipline: user.discipline_score,
        sleep: user.sleep_score,
        purpose: user.purpose_score
      },
      meaning: user.meaning,
      direction: user.direction,
      insight: user.insight
    };

    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/tasks', async (req, res) => {
  const { user_id } = req.query;
  const db = await getDb();
  const today = new Date().toISOString().split('T')[0];

  try {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [user_id]);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.onboarding_completed) {
      return res.status(400).json({ success: false, message: 'Onboarding not completed yet.' });
    }

    let tasks = await db.all('SELECT * FROM tasks WHERE user_id = ? AND date = ?', [user_id, today]);
    if (tasks.length === 0) {
      const analysis = {
        userType: user.user_type,
        mainProblem: user.main_problem,
        scores: {
          focus: user.focus_score,
          discipline: user.discipline_score,
          sleep: user.sleep_score,
          purpose: user.purpose_score
        },
        meaning: user.meaning,
        direction: user.direction,
        insight: user.insight
      };
      const newTasks = generateTasks(user_id as string, analysis as UserAnalysis);
      for (const t of newTasks) {
        await db.run(
          'INSERT INTO tasks (id, user_id, title, description, category, duration_minutes, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [t.id, t.user_id, t.title, t.description, t.category, t.duration_minutes, 'pending', t.date]
        );
      }
      tasks = newTasks;
    }

    // Map database tasks to include 'type' and 'duration' if they don't have it
    const formattedTasks = tasks.map(t => ({
      ...t,
      type: t.category, // Map category to type for frontend
      duration: t.duration_minutes // Map duration_minutes to duration for frontend
    }));

    res.json({ success: true, data: { tasks: formattedTasks } });
  } catch (error) {
    console.error('Tasks error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/reflection', async (req, res) => {
  const { user_id, reflection_text, mood_label } = req.body;
  const db = await getDb();
  const today = new Date().toISOString().split('T')[0];

  try {
    const id = uuidv4();
    await db.run(
      'INSERT INTO reflections (id, user_id, date, reflection_text, mood_label) VALUES (?, ?, ?, ?, ?)',
      [id, user_id, today, reflection_text, mood_label]
    );

    const history = await db.all('SELECT * FROM reflections WHERE user_id = ? ORDER BY date DESC', [user_id]);
    const formattedHistory = history.map(r => ({
      id: r.id,
      text: r.reflection_text,
      mood: r.mood_label,
      created_at: r.date
    }));

    res.json({ success: true, data: { reflections: formattedHistory } });
  } catch (error) {
    console.error('Reflection error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/reflection/history', async (req, res) => {
  const { user_id } = req.query;
  const db = await getDb();

  try {
    const history = await db.all('SELECT * FROM reflections WHERE user_id = ? ORDER BY date DESC', [user_id]);
    const formattedHistory = history.map(r => ({
      id: r.id,
      text: r.reflection_text,
      mood: r.mood_label,
      created_at: r.date
    }));

    res.json({ success: true, data: { reflections: formattedHistory } });
  } catch (error) {
    console.error('Reflection history error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
