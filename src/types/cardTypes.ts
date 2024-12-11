export interface CardType {
    Title:string,
    content:string,
    icon: string,
    path: string
}
export const cardData :CardType[]= [
    {
    Title:'Quiz Me',
    content:'challenge Your self with a Quiz!',
    icon: 'BrainCircuit',
    path: '/quiz'
},
{
    Title:'History',
    content:'Previous quizes',
    icon: '',
    path: '/history'
},
]