import { HStack } from "@chakra-ui/react"
import { makeid } from "./utils"

const questions = [
    {
        mode: 'easy',
        id: makeid(6),
        question: "Mdm Liza has 50 markers. Out of the fifty, mfrac 2/5 of it is Green markers. How many green markers does Mdm Liza have?",
        type: 'text',
        correct: "20"
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Scotts bought one pack of vitamin candy for $3. Then he had mfrac 3/4 of his original amount of money left?",
        type: 'text',
        correct: "12"
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "After spending mfrac 1/4 of his money on noodles and mfrac 1/3 of the remainder on a cake, John had 8 dollars left. How much money did John have at first?",
        type: 'text',
        correct: "16"
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Winnie was $y. After spending $5 how much did she have?",
        type: 'text',
        correct: "y-5"
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Sewy earns $3000 per month. He saves mfrac 1/6 of the money he earns. How much money does he save in 2 months?",
        type: 'choice',
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correct: "4"
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Scotts has $y. He used mfrac 2/5 of his money to buy a video game. How much money the Scotts have now? ",
        type: 'text',
        correct: "3/5",
        left: '$ (',
        right: "y )"
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Benjamin had some money. He can share his money with 17 friends equally. if his money is a multiple of 6, what is the lowest amount of money he has?",
        type: 'text',
        correct: "102",
        left: '$'
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Wayde had to wait for x hours. While waiting, he ate a full apple. Every 12 minutes, he eats mfrac 1/8 of the apple. What is the value of x? (express your answer as a decimal)",
        type: 'text',
        correct: "1.6",
        right: 'hours'
    },
    {
        mode: 'difficult',
        id: makeid(6),
        question: "Jake spent mfrac 2/3 of his money on shoes. Sam spent mfrac 1/3 of his money on the same shoes. They had $600 dollars left. How much money do they have altogether at first?",
        type: 'text',
        correct: "1080",
        left: '$'
    },
    {
        mode: 'difficult',
        id: makeid(6),
        question: "Ms loh had some pupils in the class. if Ms loh gives 7 candies to each pupil, she would be short of 16 candies. If she gives 5 candies to each pupil, she will have 60 candies left. How many candies did she have at first?",
        type: 'text',
        correct: "38"
    },
]

export default questions