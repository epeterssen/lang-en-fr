import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SpeakerHigh, TextAa, LinkSimple, HandWaving } from '@phosphor-icons/react'

const sections = [
  {
    icon: <SpeakerHigh size={22} weight="duotone" />,
    color: '',
    title: 'The French Alphabet & Pronunciation',
    content: [
      { term: 'A', detail: 'Pronounced "ah" — like in "father"' },
      { term: 'E', detail: 'Pronounced "uh" when unstressed, "ay" when accented (é)' },
      { term: 'I / Y', detail: 'Pronounced "ee" — like in "machine"' },
      { term: 'O', detail: 'Pronounced "oh" — rounder than in English' },
      { term: 'U', detail: 'No English equivalent — round your lips as if to say "oo" but say "ee"' },
      { term: 'R', detail: 'A guttural sound made at the back of the throat' },
      { term: 'J', detail: 'Pronounced like the "s" in "measure" — never like the English "j"' },
      { term: 'G', detail: 'Before e/i: soft "zh" sound. Before a/o/u: hard "g" like "go"' },
      { term: 'H', detail: 'Always silent in French' },
    ],
  },
  {
    icon: <TextAa size={22} weight="duotone" />,
    color: '',
    title: 'Accents & Special Characters',
    content: [
      { term: 'é', detail: 'Accent aigu — closed "ay" sound, as in été (summer)' },
      { term: 'è', detail: 'Accent grave — open "eh" sound, as in mère (mother)' },
      { term: 'ê', detail: 'Accent circumflex — like è but slightly longer, as in fête (party)' },
      { term: 'ç', detail: 'Cédille — gives c a soft "s" sound, as in garçon (boy)' },
      { term: 'à', detail: 'Accent grave — same sound as a, used only to distinguish words' },
      { term: 'ù', detail: 'Accent grave — same sound as u, used only in où (where)' },
      { term: 'ë / ï', detail: 'Tréma — indicates the vowel is pronounced separately, as in Noël' },
    ],
  },
  {
    icon: <LinkSimple size={22} weight="duotone" />,
    color: '',
    title: 'Silent Letters & Liaison',
    content: [
      { term: 'Silent consonants', detail: 'Most consonants at the end of a word are silent — e.g. petit ("puh-tee"), vous ("voo")' },
      { term: 'Silent -e', detail: 'A final -e is usually silent — e.g. une ("oon"), femme ("fam")' },
      { term: 'Liaison', detail: 'A silent final consonant is pronounced when followed by a vowel — e.g. les amis ("lay-zah-mee")' },
      { term: 'Elision', detail: 'Short words like le, la, de drop their vowel before a vowel — e.g. l\'ami, d\'accord' },
    ],
  },
  {
    icon: <HandWaving size={22} weight="duotone" />,
    color: '',
    title: 'Basic Greetings & Farewells',
    content: [
      { term: 'Bonjour', detail: 'Hello / Good day — used any time until evening' },
      { term: 'Bonsoir', detail: 'Good evening — used from early evening onward' },
      { term: 'Salut', detail: 'Hi / Bye — informal only' },
      { term: 'Au revoir', detail: 'Goodbye — suitable in all contexts' },
      { term: 'À bientôt', detail: 'See you soon' },
      { term: 'À demain', detail: 'See you tomorrow' },
      { term: 'Bonne nuit', detail: 'Good night — used when parting for the night' },
      { term: 'Comment allez-vous ?', detail: 'How are you? — formal' },
      { term: 'Ça va ?', detail: 'How\'s it going? — informal' },
      { term: 'Ça va bien, merci.', detail: 'I\'m doing well, thank you.' },
    ],
  },
]

export function Unit1() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]">
      <div className="sticky top-24 bg-background z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-2xl font-semibold">Unit 1: Foundations</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/main-menu')}>
          Main Menu
        </Button>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4 sm:grid-cols-2">
        {sections.map((section, i) => (
          <Card key={i} className="border-l-4 border-l-secondary">
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
                    <Badge key={`t-${j}`} variant="secondary" className="text-sm font-mono rounded-sm">
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
