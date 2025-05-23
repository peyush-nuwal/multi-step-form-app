import prisma from '../lib/prisma.js';


export const page1 = async (req, res) => {


    try {

        const userId = req.user.id;
        const {
            name,
            email,
            address1,
            address2,
            city,
            state,
            zipcode,
        } = req.body;





        const newForm = await prisma.form.create({
            data: {
                userId,
                name,
                email,
                address1,
                address2,
                city,
                state,
                zipcode,
                studying: false,
                school: null
            }
        })

        return res.status(201).json({ message: "Page 1 data saved", form: newForm });
    } catch (error) {
        console.error("Error saving Page 1:", error);
        return res.status(500).json({ error: "Failed to save form data" });
    }
}


export const page2 = async (req, res) => {

    const userId = req.user?.id;

    try {

        const { formId,
            studying,
            school
        } = req.body;

        
        const form = await prisma.form.findUnique({ where: { id: formId } });
        if (!form || form.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

       
        const updateForm = await prisma.form.update({
            where: { id: formId },
            data: {
                studying,
                school: studying ? school : null,
            }, include: {
                projects: true,
            }
        })

        return res.status(200).json({ message: "Page 2 data saved", form: updateForm });
    } catch (error) {
        console.error("Error saving Page 2:", error);
        return res.status(500).json({ error: "Failed to save form data" });
    }
}

export const page3 = async (req, res) => {
    try {
        const { formId, projects } = req.body;

        if (!formId || !Array.isArray(projects) || projects.length === 0) {
            return res.status(400).json({ error: "Invalid payload. formId and projects are required." });
        }

        const updateForm = await prisma.form.update({
            where: { id: formId },
            data: {
                projects: {
                    create: projects, // This now works because 'projects' is correctly destructured
                }
            },
            include: {
                projects: true,
            }
        });

        return res.status(200).json({ message: "Page 3 data saved", form: updateForm });
    } catch (error) {
        console.error("Error saving Page 3:", error);
        return res.status(500).json({ error: "Failed to save form data" });
    }
};
  
export const fullFormData = async (req, res) => {

    try {
        const { formId } = req.query

        const result = await prisma.form.findUnique({
            where: { id: formId },
            include: {
                projects: true,
            }
        })


        if (!result) {
            return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch form data" })
    }
}