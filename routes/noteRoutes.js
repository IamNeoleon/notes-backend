import express from 'express'
import Note from '../models/Note.js'
import authenticateToken from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.user);

        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            user: req.user.id,
        })
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (err) {
        res.status(500).json({ message: 'Error creating note', error: err })
    }
})

router.get('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.user);

        const notes = await Note.find({ user: req.user.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            { _id: id, user: req.user.id },
            { title, content },
            { new: true }
        )
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note' });
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete({ _id: id, user: req.user.id });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted', id: deletedNote._id });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
});


export default router;