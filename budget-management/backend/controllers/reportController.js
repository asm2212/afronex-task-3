const {generateReport} = require('../services/reportServices.js');

const getReport = async(req,res) =>{
    try {
        const report = await generateReport();
        res.status(200).json(report);
        
    } catch (error) {
        console.log("Error in getReport", error);
        res.status(500).json({ message: 'Server Error' });
        
    }
};

const exportReport = async(req, res) => {
    try {
        const report = await generateReport();
        res.setHeader('Content-Type', 'application/pdf'); // Replace with 'text/csv' for CSV export
    
        res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');  // Replace with desired filename and extension for CSV export
        res.send(report);
        res.status(200).json(report);
        
    } catch (error) {
        console.log("Error in exportReport", error);
        res.status(500).json({ message: 'Server Error' });
        
    }
};

module.exports = {
    getReport,
    exportReport,
};