type languages = 'eng' | 'ukr';
type ExecutionData = {
    cost: number;
    deadline: Date;
    executionTime: number;
}

function getExecutionData(
    language: languages,
    startDate: Date,
    fileFormat: string,
    symbolsCount: number
): ExecutionData {
    const cost: number = getCost(language, symbolsCount, fileFormat);
    const deadline: Date = getDeadline(language, startDate, fileFormat, symbolsCount);
    const executionTime: number = getExecutionTime(language, fileFormat, symbolsCount);

    return { cost, deadline, executionTime };
}

function getCost(
    language: string,
    symbolsCount: number,
    fileFormat: string
): number {
    const allowedFormats: string[] = ['doc', 'docx', 'rtf'];
    let cost: number;

    if(language == "ukr")
        cost = symbolsCount * 0.05;
    else
        cost = symbolsCount * 0.12;

    if(!allowedFormats.includes(fileFormat))
        cost = cost + ( cost / 100 * 20 );
        cost = parseFloat(cost.toFixed(2));

    if(language == 'eng' && cost < 120)
        cost = 120
    
    if(language == 'ukr' && cost < 50)
        cost = 50;

    return cost;
}

function getDeadline(
    language: languages,
    startDate: Date,
    fileFormat: string,
    symbolsCount: number
): Date {
    const hourInMs: number = 60 * 60 * 1000;
    const workdayInMs: number = 9 * 60 * 60 * 1000;
    let milliseconds: number = getExecutionTime(language, fileFormat, symbolsCount);
    let deadline: Date = new Date(startDate);

    deadline.setHours(9, 0, 0, 0);
    milliseconds += hourInMs / 2;

    if(milliseconds < hourInMs)
        milliseconds = hourInMs;

    if(milliseconds <= workdayInMs)
        return new Date(deadline.getTime() + milliseconds);

    while(milliseconds > workdayInMs) {
        let weekday = getWeekday(deadline);

        if(weekday === 'Friday')
            deadline.setDate(deadline.getDate() + 3);
        else
            deadline.setDate(deadline.getDate() + 1);

        milliseconds -= workdayInMs;
    }

    return new Date(deadline.getTime() + milliseconds);
}

function getExecutionTime(language: languages, fileFormat: string, symbolsCount: number): number {
    const allowedFormats: string[] = ['doc', 'docx', 'rtf'];
    const hourInMs: number = 60 * 60 * 1000;
    let milliseconds: number;

    if(language == 'ukr')
        milliseconds = symbolsCount / 1333 * hourInMs;
    else
        milliseconds = symbolsCount / 333 * hourInMs;

    if(!allowedFormats.includes(fileFormat))
        milliseconds = milliseconds + (milliseconds / 100 * 20);

    milliseconds = Math.round(milliseconds);

    return milliseconds;
}

function getWeekday(date: Date): string {
    const options: { weekday: 'long' } = { weekday: 'long' };
    const dayName: string = date.toLocaleDateString('en-US', options);

    return dayName;
}

export default getExecutionData;