import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const units = [
  {
    title: 'Unit 1: Foundations',
    topics: [
      'The French alphabet and pronunciation rules',
      'Accents and special characters (é, è, ê, ç, à, ù)',
      'Silent letters and liaison',
      'Basic greetings and farewells',
    ],
  },
  {
    title: 'Unit 2: Nouns and Articles',
    topics: [
      'Grammatical gender (masculine vs. feminine)',
      'Definite articles (le, la, les)',
      'Indefinite articles (un, une, des)',
      'Plural formation rules',
    ],
  },
  {
    title: 'Unit 3: Pronouns',
    topics: [
      'Subject pronouns (je, tu, il, elle, nous, vous, ils, elles)',
      'Formal vs. informal address (tu vs. vous)',
      'Stressed pronouns (moi, toi, lui...)',
    ],
  },
  {
    title: 'Unit 4: Present Tense Verbs',
    topics: [
      'Regular -er, -ir, -re conjugations',
      'High-frequency irregular verbs (être, avoir, aller, faire)',
      'Negation with ne...pas',
    ],
  },
  {
    title: 'Unit 5: Adjectives',
    topics: [
      'Agreement in gender and number',
      'Placement (before vs. after noun)',
      'Common descriptive adjectives',
    ],
  },
  {
    title: 'Unit 6: Numbers, Dates and Time',
    topics: [
      'Cardinal numbers 0–100',
      'Days, months, and seasons',
      'Telling time (il est... / à...)',
    ],
  },
  {
    title: 'Unit 7: Essential Vocabulary',
    topics: [
      'Family members',
      'Food and drink',
      'Colors, clothing, and weather',
    ],
  },
  {
    title: 'Unit 8: Basic Conversation',
    topics: [
      'Asking and answering simple questions',
      'Making introductions',
      'Ordering in a café or restaurant',
      'Asking for directions',
    ],
  },
]

export function MainMenu() {
  const navigate = useNavigate()
  const allValues = units.map((_, i) => `unit-${i}`)
  const [openItems, setOpenItems] = useState<string[]>([])
  const allExpanded = openItems.length === allValues.length

  return (
    <div className="flex flex-col">
      <div className="sticky top-24 bg-background z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-2xl font-semibold">Main Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpenItems(allExpanded ? [] : allValues)}
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </Button>
      </div>
      <div className="flex-1 px-4 py-3">
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
          {units.map((unit, i) => (
            <AccordionItem key={i} value={`unit-${i}`}>
              <AccordionTrigger className="text-base font-medium">
                {i === 0 ? (
                  <span
                    className="underline"
                    onClick={(e) => { e.stopPropagation(); navigate('/unit/1') }}
                  >
                    {unit.title}
                  </span>
                ) : unit.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pl-2">
                  {unit.topics.map((topic, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6">
          <Button onClick={() => navigate('/')}>Home</Button>
        </div>
      </div>
    </div>
  )
}
