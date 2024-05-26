const { pool } = require('../database.js');

const getPatterns = async (req, res) => {
    try {
        let { catId } = req.body;
        let query = `
                    SELECT 
                    pattern.id,
                    category.type AS categoryType,
                    pattern.title,
                    pattern.catid AS categoryId,
                    pattern.information,
                    pattern.createddate,
                    pattern.updateddate
                FROM 
                    pattern
                LEFT JOIN 
                    category ON pattern.catid = category.id
            `;

        if (catId) {
            query += ` WHERE category.id = ${catId}`;
        }
        query += ` ORDER BY pattern.id DESC`;

        const caregoryData = await pool.query(query);
        return res.json({
            status: 200,
            data: caregoryData.rows
        });

    } catch (e) {
        console.log(e)
        return res.json({
            status: 500,
            message: "internal server error"
        })
    }
}

const savePatterns = async (req, res) => {
    try {
        const { catId, title, information } = req.body;
        if (catId && title && information) {
            const findCaregoryById = `select * from category where id = ${catId}`;
            const caregoryData = await pool.query(findCaregoryById);
            if (caregoryData?.rows?.length) {
                const savePatternQuery = `INSERT INTO pattern (catId,title, information) VALUES (${catId},'${title}', '${information}');`
                const savePatternResult = await pool.query(savePatternQuery);
                if (savePatternResult.rowCount) {
                    return res.json({
                        status: 201,
                        message: "Patterns were saved successfully"
                    })
                } else {
                    return res.json({
                        status: 500,
                        message: "internal server error"
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: "Invalid caregory Id"
                });
            }
        } else {
            return res.json({
                status: 400,
                message: "BED request"
            })
        }
    } catch (error) {
        console.error('Error executing query', error.message);
        return res.json({
            status: 500,
            message: "internal server error"
        })
    }
};

const updatePatterns = async (req, res) => {
    try {
        const { id, catId, title, information } = req.body;
        if (id && catId && title && information) {
            const findCaregoryById = `select * from category where id = ${catId}`;
            const caregoryData = await pool.query(findCaregoryById);
            if (caregoryData?.rows?.length) {
                const patternData = await pool.query(`select * from pattern where id = ${id}`);
                if (patternData?.rows?.length) {
                    const upudateQuery = `UPDATE pattern SET title = '${title}', information = '${information}', catId = ${catId} WHERE id = ${id}`;
                    const updatePatternsresult = await pool.query(upudateQuery);
                    if (updatePatternsresult?.rowCount) {
                        return res.json({
                            status: 200,
                            message: "pattern update successfully"
                        })
                    } else {
                        return res.json({
                            status: 500,
                            message: "internal server error"
                        })
                    }
                } else {
                    return res.json({
                        status: 400,
                        message: "Invalid Id"
                    });
                }
            } else {
                return res.json({
                    status: 400,
                    message: "Invalid caregory Id"
                });
            }
        } else {
            return res.json({
                status: 400,
                message: "BED request"
            })
        }
    } catch (error) {
        console.error('Error executing query', error.message);
        return res.json({
            status: 500,
            message: "internal server error"
        })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const categoryData = await pool.query(`select * from category`);
        return res.json({
            status: 200,
            data: categoryData?.rows
        })
    } catch (e) {
        console.log(e.message)
        return res.json({
            status: 500,
            message: "internal server error"
        })
    }
}

module.exports = {
    getPatterns,
    savePatterns,
    updatePatterns,
    getAllCategory
};