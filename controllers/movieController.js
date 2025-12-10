const Movie = require('../models/Movie');
const fs = require('fs').promises;
const path = require('path');

/**
 * Movie Controller
 * Demonstrates: MVC pattern, CRUD operations, Async/Await, Error handling
 */

// @desc    Get all movies
// @route   GET /movies
const getAllMovies = async (req, res) => {
    try {
        const { search, genre, sort } = req.query;

        // Build query
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { director: { $regex: search, $options: 'i' } }
            ];
        }

        if (genre && genre !== 'All') {
            query.genre = genre;
        }

        // Build sort
        let sortOption = {};
        switch (sort) {
            case 'year-desc':
                sortOption = { year: -1 };
                break;
            case 'year-asc':
                sortOption = { year: 1 };
                break;
            case 'title':
                sortOption = { title: 1 };
                break;
            case 'rating':
                sortOption = { rating: -1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }

        const movies = await Movie.find(query).sort(sortOption);

        res.render('movies/index', {
            title: 'Movie Collection',
            movies,
            search: search || '',
            selectedGenre: genre || 'All',
            selectedSort: sort || 'newest'
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error fetching movies',
            error
        });
    }
};

// @desc    Show add movie form
// @route   GET /movies/new
const showAddForm = (req, res) => {
    res.render('movies/new', {
        title: 'Add New Movie'
    });
};

// @desc    Create new movie
// @route   POST /movies
const createMovie = async (req, res) => {
    try {
        const { title, year, description, genre, rating, director } = req.body;

        // Prepare movie data
        const movieData = {
            title,
            year: parseInt(year),
            description,
            genre,
            rating: rating ? parseFloat(rating) : 0,
            director
        };

        // Add poster if uploaded
        if (req.file) {
            movieData.poster = '/uploads/' + req.file.filename;
        }

        const movie = await Movie.create(movieData);

        console.log('✅ Movie created:', movie.title);
        res.redirect('/movies');
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(400).render('movies/new', {
            title: 'Add New Movie',
            error: error.message
        });
    }
};

// @desc    Show single movie
// @route   GET /movies/:id
const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).render('error', {
                title: 'Not Found',
                message: 'Movie not found'
            });
        }

        res.render('movies/show', {
            title: movie.title,
            movie
        });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error fetching movie details',
            error
        });
    }
};

// @desc    Show edit movie form
// @route   GET /movies/:id/edit
const showEditForm = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).render('error', {
                title: 'Not Found',
                message: 'Movie not found'
            });
        }

        res.render('movies/edit', {
            title: `Edit ${movie.title}`,
            movie
        });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error fetching movie',
            error
        });
    }
};

// @desc    Update movie
// @route   PUT /movies/:id
const updateMovie = async (req, res) => {
    try {
        const { title, year, description, genre, rating, director } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).render('error', {
                title: 'Not Found',
                message: 'Movie not found'
            });
        }

        // Update fields
        movie.title = title;
        movie.year = parseInt(year);
        movie.description = description;
        movie.genre = genre;
        movie.rating = rating ? parseFloat(rating) : movie.rating;
        movie.director = director;

        // Handle new poster upload
        if (req.file) {
            // Delete old poster if it exists and is not default
            if (movie.poster && movie.poster !== '/images/default-poster.svg') {
                const oldPosterPath = path.join(__dirname, '../public', movie.poster);
                try {
                    await fs.unlink(oldPosterPath);
                } catch (err) {
                    console.log('Old poster not found or already deleted');
                }
            }
            movie.poster = '/uploads/' + req.file.filename;
        }

        await movie.save();

        console.log('✅ Movie updated:', movie.title);
        res.redirect(`/movies/${movie._id}`);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(400).render('movies/edit', {
            title: 'Edit Movie',
            movie: req.body,
            error: error.message
        });
    }
};

// @desc    Delete movie
// @route   DELETE /movies/:id
const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        // Delete poster file if it exists and is not default
        if (movie.poster && movie.poster !== '/images/default-poster.svg') {
            const posterPath = path.join(__dirname, '../public', movie.poster);
            try {
                await fs.unlink(posterPath);
                console.log('🗑️  Deleted poster file');
            } catch (err) {
                console.log('Poster file not found or already deleted');
            }
        }

        await Movie.findByIdAndDelete(req.params.id);

        console.log('✅ Movie deleted:', movie.title);
        res.redirect('/movies');
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting movie'
        });
    }
};

module.exports = {
    getAllMovies,
    showAddForm,
    createMovie,
    getMovie,
    showEditForm,
    updateMovie,
    deleteMovie
};
