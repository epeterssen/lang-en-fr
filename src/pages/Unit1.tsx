import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const sections = [
  {
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
    title: 'Accents & Special Characters',
    content: [
      { term: 'é — accent aigu', detail: 'Closed "ay" sound, as in été (summer)' },
      { term: 'è — accent grave', detail: 'Open "eh" sound, as in mère (mother)' },
      { term: 'ê — accent circumflex', detail: 'Like è but slightly longer, as in fête (party)' },
      { term: 'ç — cédille', detail: 'Gives c a soft "s" sound, as in garçon (boy)' },
      { term: 'à — accent grave', detail: 'Same sound as a — used only to distinguish words (à vs a)' },
      { term: 'ù — accent grave', detail: 'Same sound as u — used only in où (where)' },
      { term: 'ë / ï — tréma', detail: 'Indicates the vowel is pronounced separately, as in Noël' },
    ],
  },
  {
    title: 'Silent Letters & Liaison',
    content: [
      { term: 'Silent final consonants', detail: 'Most consonants at the end of a word are silent — e.g. petit ("puh-tee"), vous ("voo")' },
      { term: 'Silent -e', detail: 'A final -e is usually silent — e.g. une ("oon"), femme ("fam")' },
      { term: 'Liaison', detail: 'When a word ending in a silent consonant is followed by a word starting with a vowel, the consonant is pronounced — e.g. les amis ("lay-zah-mee")' },
      { term: 'Elision', detail: 'Short words like le, la, de, que drop their vowel before another vowel — e.g. l\'ami, d\'accord' },
    ],
  },
  {
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

      <div className="flex-1 px-4 py-3 space-y-8">
        {sections.map((section, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold mb-3 border-b pb-1">{section.title}</h3>
            <dl className="space-y-2">
              {section.content.map((item, j) => (
                <div key={j} className="grid grid-cols-[200px_1fr] gap-4">
                  <dt className="text-sm font-medium">{item.term}</dt>
                  <dd className="text-sm text-muted-foreground">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
