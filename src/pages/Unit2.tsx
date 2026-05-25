import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScalesIcon, BookOpenIcon, TagIcon, StackIcon } from '@phosphor-icons/react'
import { RolodexView } from '@/components/RolodexView'
import { UnitHeader } from '@/components/UnitHeader'
import { useSettingsStore } from '@/store/settings'
import { TXT } from '@/utils/txt'
import type { Section } from '@/types'

const sections: Section[] = [
  {
    icon: <ScalesIcon size={22} weight="duotone" />,
    title: 'Grammatical Gender (Masculine / Feminine)',
    content: [
      { detail: <strong>Every French noun is either masculine or feminine: there is no neutral. Gender must be learned with each word. Gender does not follow logic:</strong> },
      { detail: '' },
      { term: 'le livre', detail: 'The book: masculine.' },
      { term: 'une chaise', detail: 'A chair: feminine' },
      { term: 'un bureau', detail: 'A desk: masculine' },
      { detail: '' },
      { detail: <strong>There are some hints which can help to determine gender:</strong> },
      { term: '-age', detail: <>Usually masculine: {TXT.ttip('le fromage', 'cheese')}, {TXT.ttip('le voyage', 'trip')}, {TXT.ttip('le message', 'message')}</> },
      { term: '-ment', detail: <>Usually masculine: {TXT.ttip('le bâtiment', 'building')}, {TXT.ttip("l'appartement", 'apartment')}, {TXT.ttip('le gouvernement', 'government')}</> },
      { term: '-tion / -sion', detail: <>Usually feminine: {TXT.ttip('la nation', 'nation')}, {TXT.ttip('la décision', 'decision')}, {TXT.ttip('la conversation', 'conversation')}</> },
      { term: '-ure', detail: <>Usually feminine: {TXT.ttip('la voiture', 'car')}, {TXT.ttip('la nature', 'nature')}, {TXT.ttip('la culture', 'culture')}</> },
      { term: '-ette', detail: <>Usually feminine: {TXT.ttip('la baguette', 'baguette')}, {TXT.ttip('la serviette', 'napkin')}, {TXT.ttip('la cigarette', 'cigarette')}</> },
      { term: '-ance / -ence', detail: <>Usually feminine: {TXT.ttip('la chance', 'luck')}, {TXT.ttip('la différence', 'difference')}, {TXT.ttip('la violence', 'violence')}</> },
    ],
  },
  {
    icon: <BookOpenIcon size={22} weight="duotone" />,
    title: 'Definite Articles (the)',
    content: [
      { detail: <strong>French uses the definite article for general statements: J'aime le café means "I like coffee" (in general), not "I like the coffee"</strong> },
      { detail: '' },
      { detail: 'Singular' },
      { term: 'le', detail: <>Masculine singular: {TXT.ttip('le chat', 'the cat')}, {TXT.ttip('le pain', 'the bread')}</> },
      { term: 'la', detail: <>Feminine singular: {TXT.ttip('la maison', 'the house')}, {TXT.ttip('la rue', 'the street')}</> },
      { term: "l'", detail: <>Before a vowel or silent h: {TXT.ttip("l'ami", 'the friend')}, {TXT.ttip("l'heure", 'the hour')}, {TXT.ttip("l'hôtel", 'the hotel')}</> },
      { detail: '' },
      { detail: 'Plural' },
      { term: 'les', detail: <>All plurals: {TXT.ttip('les chats', 'the cats')}, {TXT.ttip('les maisons', 'the houses')}</> },
      { detail: '' },
      { detail: 'Contractions' },
      { term: 'au', detail: <>Le contracts with à: à + le → {TXT.ttip('au marché', 'at the market')}</> },
      { term: 'aux', detail: <>Les contracts with à: à + les → {TXT.ttip('aux enfants', 'to the children')}</> },
      { term: 'du', detail: <>Le contracts with de: de + le → {TXT.ttip('du pain', 'some bread')}</> },
      { term: 'des', detail: <>Les contracts with de: de + les → {TXT.ttip('des amis', 'some friends')}</> },
    ],
  },
  {
    icon: <TagIcon size={22} weight="duotone" />,
    title: 'Indefinite Articles (a / some)',
    content: [
      { detail: <strong>French uses indefinite articles for non-specific nouns: J'ai un chat means "I have a cat" (some cat, not a specific one).</strong> },
      { detail: <strong>In the plural, des means "some": J'ai des amis means "I have some friends."</strong> },
      { detail: '' },
      { detail: 'Singular' },
      { term: 'un', detail: <>Masculine singular: {TXT.ttip('un chien', 'a dog')}, {TXT.ttip('un homme', 'a man')}</> },
      { term: 'une', detail: <>Feminine singular: {TXT.ttip('une pomme', 'an apple')}, {TXT.ttip('une femme', 'a woman')}</> },
      { detail: '' },
      { detail: 'Plural' },
      { term: 'des', detail: <>{TXT.ttip('des chiens', 'some dogs')}, {TXT.ttip('des pommes', 'some apples')}</> },
      { detail: '' },
      { detail: 'Specifics' },
      { term: 'After negation', detail: <>Un, une, and des become de (or d' before a vowel) after a negative verb: {TXT.ttip("Je n'ai pas de chien", "I don't have a dog")}, {TXT.ttip("Je n'ai pas d'ami", "I don't have a friend")}</> },
      { term: "C'est un...", detail: <>Use the indefinite article after c'est when identifying: {TXT.ttip("C'est un professeur", "He's a teacher")}. With être + profession, drop the article: Il est professeur</> },
    ],
  },
  {
    icon: <StackIcon size={22} weight="duotone" />,
    title: 'Plural Formation',
    content: [
      { detail: <strong>Most nouns add -s:</strong> },
      { term: 'Regular: + s', detail: <>{TXT.ttip('le chat', 'the cat')} → les chats, {TXT.ttip('la table', 'the table')} → les tables (the -s is silent)</> },
      { detail: '' },
      { detail: <strong>Some do not:</strong> },
      { term: '-s / -x / -z', detail: <>{TXT.ttip('le bras', 'arm')} → les bras, {TXT.ttip('la voix', 'voice')} → les voix, {TXT.ttip('le nez', 'nose')} → les nez</> },
      { detail: '' },
      { detail: <strong>Some add 'x':</strong> },
      { term: '-eau → -eaux', detail: <>{TXT.ttip('le gâteau', 'cake')} → les gâteaux, {TXT.ttip('le chapeau', 'hat')} → les chapeaux</> },
      { term: '-eu → -eux', detail: <>{TXT.ttip('le jeu', 'game')} → les jeux, {TXT.ttip('le feu', 'fire')} → les feux</> },
      { detail: '' },
      { detail: <strong>Some change endings:</strong> },
      { term: '-al → -aux', detail: <>{TXT.ttip('le cheval', 'horse')} → les chevaux, {TXT.ttip('le journal', 'newspaper')} → les journaux</> },
      { detail: '' },
      { detail: <strong>Some are unique:</strong> },
      { term: 'Irregular', detail: <>{TXT.ttip("l'œil", 'eye')} → les yeux, {TXT.ttip('le monsieur', 'gentleman')} → les messieurs</> },
    ],
  },
]

export function Unit2() {
  const rolodex = useSettingsStore((s) => s.rolodex)

  return (
    <div className="flex flex-col">
      <UnitHeader title="Unit 2: Nouns and Articles" />

      {rolodex ? (
        <RolodexView sections={sections} />
      ) : (
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
                    item.term ? (
                      <>
                        <Badge key={`t-${j}`} variant="secondary" className="text-sm font-mono rounded-sm ![background-color:rgba(0,35,149,0.12)]">
                          {item.term}
                        </Badge>
                        <dd key={`d-${j}`} className="text-sm text-muted-foreground">{item.detail}</dd>
                      </>
                    ) : (
                      <dd key={`d-${j}`} className="col-span-2 text-sm text-muted-foreground">{item.detail}</dd>
                    )
                  ))}
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
