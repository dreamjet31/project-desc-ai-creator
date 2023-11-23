const PROMPT_EXAMPLE = 
    `Create 10 different sections and 10 different pieces of content for each section that will be used to create a white paper for this project. 
    Please output in the format below:
    { 
        section's name:[content's names, ...],
    }
    Like this:
    "Mission Statement": [
        "Our mission is to reshape the film industry by achieving global dominance in the film machine market.",
        "We embark on this journey by strategically entering the Canadian market, subsequently expanding into the USA and Europe",
        "This whitepaper outlines our comprehensive strategy, emphasizing the establishment of an annual industry event and the initiation of a small film firm",
    ],
    "Objectives": [
        "Dominate the film machine market in Canada.",
        "Expand operations to the USA and Europe.",
        "Establish an annual event for industry networking and visibility.",
        "Create a small film firm for collaborative film production with renowned actors and studios.",
        "Provide invited studios with discounted film machines to incentivize collaboration."
    ],
    `
    

export {
    PROMPT_EXAMPLE
}