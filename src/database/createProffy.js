module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    //INSERIR DADOS NA TABELA proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whats,
            bio
        ) VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);
    const proffy_id = insertedProffy.lastID;

    /*Inserir dados na tabela classes */
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
               "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `);
    const class_id = insertedClass.lastID

    //inserir dados na tabela schedule
    const insertedAllClasscheduleValues = classScheduleValues.map((classScheduleValue) => {
            return db.run(`
            INSERT INTO class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
    `)
        })
        //executar todos os db.run() das classes schedules
    await Promise.all(insertedAllClasscheduleValues);
}