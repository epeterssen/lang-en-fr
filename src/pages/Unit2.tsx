import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Scales, BookOpen, Tag, Stack } from '@phosphor-icons/react'

const sections = [
  {
    icon: <Scales size={22} weight="duotone" />,
    title: 'Grammatical Gender',
    content: [
      { term: 'Masculine / Feminine', detail: 'Every French noun is either masculine or feminine: there is no neutral. Gender must be learned with each word.' },
      { term: 'le livre', detail: 'The book: masculine. Gender does not follow logic: une chaise (a chair) is feminine, un bureau (a desk) is masculine.' },
      { term: '-age', detail: 'Usually masculine: le fromage (cheese), le voyage (trip), le message (message)' },
      { term: '-ment', detail: 'Usually masculine: le bâtiment (building), l\'appartement (apartment), le gouvernement (government)' },
      { term: '-tion / -sion', detail: 'Usually feminine: la nation, la décision, la conversation' },
      { term: '-ure', detail: 'Usually feminine: la voiture (car), la nature (nature), la culture (culture)' },
      { term: '-ette', detail: 'Usually feminine: la baguette, la serviette (napkin), la cigarette' },
      { term: '-ance / -ence', detail: 'Usually feminine: la chance (luck), la différence, la violence' },
    ],
  },
  {
    icon: <BookOpen size={22} weight="duotone" />,
    title: 'Definite Articles (the)',
    content: [
      { term: 'le', detail: 'Masculine singular: le chat (the cat), le pain (the bread)' },
      { term: 'la', detail: 'Feminine singular: la maison (the house), la rue (the street)' },
      { term: 'l\'', detail: 'Before a vowel or silent h: l\'ami (the friend), l\'heure (the hour), l\'hôtel (the hotel)' },
      { term: 'les', detail: 'All plurals: les chats (the cats), les maisons (the houses)' },
      { term: 'General use', detail: 'French uses the definite article for general statements: J\'aime le café means "I like coffee" (in general), not "I like the coffee"' },
      { term: 'au / aux', detail: 'Le and les contract with à: à + le → au (au marché, at the market), à + les → aux (aux enfants, to the children)' },
      { term: 'du / des', detail: 'Le and les contract with de: de + le → du (du pain, some bread), de + les → des (des amis, some friends)' },
    ],
  },
  {
    icon: <Tag size={22} weight="duotone" />,
    title: 'Indefinite Articles (a / some)',
    content: [
      { term: 'un', detail: 'Masculine singular: un chien (a dog), un homme (a man)' },
      { term: 'une', detail: 'Feminine singular: une pomme (an apple), une femme (a woman)' },
      { term: 'des', detail: 'All plurals: des chiens (some dogs), des pommes (some apples). Often untranslated in English.' },
      { term: 'After negation', detail: 'Un, une, and des become de (or d\' before a vowel) after a negative verb: Je n\'ai pas de chien (I don\'t have a dog), Je n\'ai pas d\'ami (I don\'t have a friend)' },
      { term: 'C\'est un...', detail: 'Use the indefinite article after c\'est when identifying: C\'est un professeur (He\'s a teacher). With être + profession, drop it: Il est professeur.' },
    ],
  },
  {
    icon: <Stack size={22} weight="duotone" />,
    title: 'Plural Formation',
    content: [
      { term: 'Regular: + s', detail: 'Most nouns add -s: le chat → les chats, la table → les tables (the -s is silent)' },
      { term: '-s / -x / -z', detail: 'No change: le bras (arm) → les bras, la voix (voice) → les voix, le nez (nose) → les nez' },
      { term: '-eau → -eaux', detail: 'Add -x: le gâteau (cake) → les gâteaux, le chapeau (hat) → les chapeaux' },
      { term: '-al → -aux', detail: 'Change ending: le cheval (horse) → les chevaux, le journal (newspaper) → les journaux' },
      { term: '-eu → -eux', detail: 'Add -x: le jeu (game) → les jeux, le feu (fire) → les feux' },
      { term: 'Irregular', detail: 'Some are fully irregular: l\'œil (eye) → les yeux, le monsieur → les messieurs' },
    ],
  },
]

export function Unit2() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <div className="sticky top-24 bg-background z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-2xl font-semibold">Unit 2: Nouns and Articles</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/main-menu')}>
          Main Menu
        </Button>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4">
        {sections.map((section, i) => (
          <Card key={i} className="border-l-4 border-l-secondary backdrop-blur-md ![background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-2 items-center">
                {section.content.map((item, j) => (
                  <>
                    <Badge key={`t-${j}`} variant="secondary" className="text-sm font-mono rounded-sm ![background-color:rgba(0,35,149,0.12)]">
                      {item.term}
                    </Badge>
                    <dd key={`d-${j}`} className="text-sm text-muted-foreground">{item.detail}</dd>
                  </>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
