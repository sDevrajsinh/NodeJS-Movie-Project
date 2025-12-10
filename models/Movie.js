const mongoose = require('mongoose');

/**
 * Movie Model
 * Demonstrates: MongoDB Schema, Validation, Timestamps
 */

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    year: {
        type: Number,
        required: [true, 'Release year is required'],
        min: [1888, 'Year must be 1888 or later'],
        max: [new Date().getFullYear() + 5, 'Year cannot be too far in the future']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    poster: {
        type: String,
        default: '/images/default-poster.svg'
    },
    genre: {
        type: String,
        enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Other'],
        default: 'Other'
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    director: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Virtual for formatted year
movieSchema.virtual('formattedYear').get(function () {
    return `(${this.year})`;
});

// Instance method to get short description
movieSchema.methods.getShortDescription = function () {
    return this.description.length > 150
        ? this.description.substring(0, 150) + '...'
        : this.description;
};

// Static method to find movies by year range
movieSchema.statics.findByYearRange = function (startYear, endYear) {
    return this.find({ year: { $gte: startYear, $lte: endYear } });
};

module.exports = mongoose.model('Movie', movieSchema);
