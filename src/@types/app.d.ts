interface IProject {
    id?: number;
    description?: string;
    logourl?: string;
    title?: string;
}

interface IResult {
    sections: string[];
    contents: string[][];
}