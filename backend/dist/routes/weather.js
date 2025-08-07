"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'Weather API is working!' });
});
// Get current weather for a location
router.get('/current/:location', async (req, res) => {
    try {
        const { location } = req.params;
        // TODO: Implement actual weather API integration
        // For now, return mock data
        const mockWeather = {
            location,
            temperature: 22,
            condition: 'Sunny',
            humidity: 65,
            windSpeed: 12,
            timestamp: new Date().toISOString()
        };
        res.json({
            success: true,
            data: mockWeather
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather data'
        });
    }
});
// Get weather forecast for a location
router.get('/forecast/:location', async (req, res) => {
    try {
        const { location } = req.params;
        const { days = '7' } = req.query;
        // TODO: Implement actual forecast API integration
        const mockForecast = Array.from({ length: parseInt(days) }, (_, i) => ({
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            high: 25 + Math.floor(Math.random() * 10),
            low: 15 + Math.floor(Math.random() * 10),
            condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
        }));
        res.json({
            success: true,
            data: {
                location,
                forecast: mockForecast
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch forecast data'
        });
    }
});
exports.default = router;
