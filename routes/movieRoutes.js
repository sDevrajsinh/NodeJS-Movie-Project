const express = require('express');
const router = express.Router();
const { upload, handleMulterError } = require('../middleware/upload');
const {
    getAllMovies,
    showAddForm,
    createMovie,
    getMovie,
    showEditForm,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');

/**
 * Movie Routes
 * Demonstrates: Express routing, Route parameters, Query strings
 */

// GET all movies (with optional query parameters for search/filter)
router.get('/', getAllMovies);

// GET form to create new movie
router.get('/new', showAddForm);

// POST create new movie (with file upload)
router.post('/', upload.single('poster'), handleMulterError, createMovie);

// GET single movie by ID
router.get('/:id', getMovie);

// GET form to edit movie
router.get('/:id/edit', showEditForm);

// PUT update movie (with optional file upload)
router.put('/:id', upload.single('poster'), handleMulterError, updateMovie);

// DELETE movie
router.delete('/:id', deleteMovie);

module.exports = router;
