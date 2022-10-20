import { HStack } from "@chakra-ui/react"
import { makeid } from "./utils"

const questions = [
    {
        mode: 'easy',
        id: makeid(6),
        question: "Mdm Liza has 50 markers. Out of the fifty, mfrac 2/5 of it is Green markers. How many green markers does Mdm Liza have?",
        type: 'text',
        correct: "20",
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Scotts bought one pack of vitamin candy for $3. Then he had mfrac 3/4 of his original amount of money left. What is his original amount of money?",
        type: 'text',
        correct: "12",
        left: '$',
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Scotts has $y. He used mfrac 2/5 of his money to buy a video game. How much money the Scotts have now? ",
        type: 'text',
        correct: "3/5",
        left: '$ (',
        right: "y )",
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Winnie had $y. After spending $5 how much did she have?",
        type: 'text',
        correct: "y-5",
        left: '$ (',
        right: ')',
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Sewy earns $3000 per month. He saves mfrac 1/6 of the money he earns. How much money does he save in 2 months?",
        type: 'text',
        correct: "1000",
        left: '$',
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "2/4 of a number is 18. What is the number?",
        type: 'text',
        correct: "32",
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "25% of a number is 11. What is the number?",
        type: 'text',
        correct: "44",
        money: 100
    },
    {
        mode: 'easy',
        id: makeid(6),
        question: "Carl saves 80% of his salary everyday. If he salary was $40, how much did he save in 5 days?",
        type: 'text',
        correct: "160",
        money: 100
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "After spending mfrac 1/4 of his money on noodles and mfrac 1/3 of the remainder on a cake, John had 8 dollars left. How much money did John have at first?",
        type: 'text',
        correct: "16",
        left: '$',
        money: 300
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Benjamin had some money. He can share his money with 17 friends equally. if his money is a multiple of 6, what is the lowest amount of money he has?",
        type: 'text',
        correct: "102",
        left: '$',
        money: 300
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Wayde had to wait for x hours. While waiting, he ate a full apple. Every 12 minutes, he eats mfrac 1/8 of the apple. What is the value of x? (express your answer as a decimal)",
        type: 'text',
        correct: "1.6",
        right: 'hours',
        money: 300
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Jack had x hours for his test  Every 5 minutes, he finishes one question. If there are 21 questions in the test and he had 10 minutes to check. What is the value of x? (express your answer in minutes)",
        type: 'text',
        correct: "115",
        right: 'minutes',
        money: 300
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "Justine eats x sausages everyday. Lucas eats x+3 sausages everyday. If Lucas eats 13 sausages everyday, how many sausages does Justine eat everyday? ",
        type: 'text',
        correct: "10",
        money: 300
    },
    {
        mode: 'medium',
        id: makeid(6),
        question: "If Andy spends 25% of his allowance every day, what percentage of the original allowance will he spent in a week?",
        type: 'text',
        correct: "175",
        right: '%',
        money: 300
    },
    {
        mode: 'difficult',
        id: makeid(6),
        question: "Jake spent mfrac 2/3 of his money on shoes. Sam spent mfrac 1/3 of his money on the same shoes. They had $600 dollars left. How much money do they have altogether at first?",
        type: 'text',
        correct: "1080",
        left: '$',
        money: 500
    },
    {
        mode: 'difficult',
        id: makeid(6),
        question: "Jackle spent 2/4 of her money on a book. Samuel spent 2/3 of his money on the same book. They had $28 dollars left altogether . How much money do they have altogether at first?",
        type: 'text',
        correct: "49",
        left: '$',
        money: 500
    },
    {
        mode: 'difficult',
        id: makeid(6),
        question: "Ms loh had some pupils in the class. if Ms loh gives 7 candies to each pupil, she would be short of 16 candies. If she gives 5 candies to each pupil, she will have 60 candies left. How many candies did she have at first?",
        type: 'text',
        correct: "38",
        money: 500
    },
    {
        mode: 'difficult',
        id: makeid(6),
        question: "In an estate, there are 42 dogs and chickens. However, 12 dogs and chickens lost 32 legs. The total number of legs is 10 times the number of chickens that lost their legs. How many dogs are there?",
        type: 'text',
        correct: "15",
        money: 500
    },
]

export default questions