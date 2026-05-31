import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PencilSimpleIcon, BooksIcon, ArrowsLeftRightIcon, FlameIcon, ProhibitIcon, GitBranchIcon, ListNumbersIcon, KeyIcon, CrownIcon } from '@phosphor-icons/react'
import { ConjugationTable } from '@/components/ConjugationTable'
import { RolodexView } from '@/components/RolodexView'
import { UnitHeader } from '@/components/UnitHeader'
import { useSettingsStore } from '@/store/settings'
import { TXT } from '@/utils/txt'
import type { Section } from '@/types'

const sections: Section[] = [
  {
    icon: <GitBranchIcon size={22} weight="duotone" />,
    title: 'Regular vs. Irregular Verbs (Réguliers vs. irréguliers)',
    content: [
      { detail: <strong>Every French verb belongs to one of two categories: regular or irregular. Understanding this distinction is the foundation of verb conjugation.</strong> },
      { detail: '' },
      { detail: 'Regular verbs' },
      { detail: <>Regular verbs follow a predictable pattern. Once you know the ending group (-er, -ir, or -re), you can conjugate any regular verb by applying the same set of endings to the stem.</> },
      { term: 'parler', detail: <>{TXT.ttip('je parle', 'I speak')}, {TXT.ttip('tu parles', 'you speak')}, {TXT.ttip('il parle', 'he speaks')} — predictable throughout</> },
      { term: 'finir', detail: <>{TXT.ttip('je finis', 'I finish')}, {TXT.ttip('tu finis', 'you finish')}, {TXT.ttip('il finit', 'he finishes')} — predictable throughout</> },
      { detail: '' },
      { detail: 'Irregular verbs' },
      { detail: <>Irregular verbs do not follow these patterns. Their stems and endings change unpredictably and must be memorized individually. However, the most common French verbs are irregular, so learning them pays off immediately.</> },
      { term: 'être', detail: <>{TXT.ttip('je suis', 'I am')}, {TXT.ttip('tu es', 'you are')}, {TXT.ttip('il est', 'he is')} — no pattern</> },
      { term: 'avoir', detail: <>{TXT.ttip("j'ai", 'I have')}, {TXT.ttip('tu as', 'you have')}, {TXT.ttip('il a', 'he has')} — no pattern</> },
      { detail: '' },
      { detail: <strong>This unit covers all three regular groups and the four most essential irregular verbs: être, avoir, aller, and faire.</strong> },
    ],
  },
  {
    icon: <ListNumbersIcon size={22} weight="duotone" />,
    title: 'The Three Verb Groups (Les trois groupes)',
    cardClass: 'border-l-4 border-l-[rgba(237,41,57,0.75)] backdrop-blur-md ![background:linear-gradient(to_bottom,rgba(237,41,57,0.04)_0%,rgba(237,41,57,0.02)_100%)]',
    content: [
      { detail: <strong>French grammarians classify all verbs into three formal groups. Knowing which group a verb belongs to tells you exactly how to conjugate it.</strong> },
      { detail: '' },
      { term: 'Group 1', detail: <>All -er verbs, with some exceptions such as <em>aller</em>. The largest group by far — roughly 90% of French verbs, including almost every new word coined in modern French: {TXT.ttip('googler', 'to google')}, {TXT.ttip('tweeter', 'to tweet')}.</> },
      { term: 'Group 2', detail: <>Regular -ir verbs that insert <em>-iss-</em> in the plural forms: {TXT.ttip('finir', 'to finish')}, {TXT.ttip('choisir', 'to choose')}, {TXT.ttip('grandir', 'to grow')}. A stable, mid-sized group.</> },
      { term: 'Group 3', detail: <>Everything else — a catch-all for all irregular verbs. It includes <em>aller</em> (the only irregular -er verb), -ir verbs without -iss- ({TXT.ttip('partir', 'to leave')}, {TXT.ttip('venir', 'to come')}), all -re verbs, and one-offs like <em>être</em>, <em>avoir</em>, and <em>faire</em>.</> },
      { detail: '' },
      { detail: <strong>This unit covers Group 1 (parler), Group 2 (finir), and the most essential Group 3 verbs: -re verbs (vendre), être, avoir, aller, and faire.</strong> },
    ],
  },
  {
    icon: <PencilSimpleIcon size={22} weight="duotone" />,
    title: 'Regular -er Verbs (Verbes en -er)',
    content: [
      { detail: <strong>-er verbs are the largest and most regular group in French. Remove -er from the infinitive to get the stem, then add the endings below.</strong> },
      { detail: '' },
      { detail: 'Endings (parler → parl-)' },
      { term: 'je', detail: <>-e: {TXT.ttip('je parle', 'I speak')}</> },
      { term: 'tu', detail: <>-es: {TXT.ttip('tu parles', 'you speak')}</> },
      { term: 'il / elle / on', detail: <>-e: {TXT.ttip('il parle', 'he speaks')}, {TXT.ttip('elle parle', 'she speaks')}</> },
      { term: 'nous', detail: <>-ons: {TXT.ttip('nous parlons', 'we speak')}</> },
      { term: 'vous', detail: <>-ez: {TXT.ttip('vous parlez', 'you speak')}</> },
      { term: 'ils / elles', detail: <>-ent: {TXT.ttip('ils parlent', 'they speak')} (the -ent is always silent)</> },
      { detail: '' },
      { detail: 'Other common -er verbs:' },
      { term: 'aimer', detail: <>{TXT.ttip("j'aime", 'I like / love')}, {TXT.ttip('tu aimes', 'you like')}</> },
      { term: 'habiter', detail: <>{TXT.ttip("j'habite à Paris", 'I live in Paris')}</> },
      { term: 'travailler', detail: <>{TXT.ttip('il travaille', 'he works')}</> },
      { term: 'écouter', detail: <>{TXT.ttip("j'écoute de la musique", 'I listen to music')}</> },
      { term: 'regarder', detail: <>{TXT.ttip('elle regarde la télé', 'she watches TV')}</> },
      { term: 'manger', detail: <>{TXT.ttip('nous mangeons', 'we eat')} (nous adds -e- to preserve the soft g sound)</> },
    ],
  },
  {
    icon: <BooksIcon size={22} weight="duotone" />,
    title: 'Regular -ir Verbs (Verbes en -ir)',
    content: [
      { detail: <strong>-ir verbs form the second group. Remove -ir from the infinitive to get the stem. Note the -iss- inserted in all plural forms.</strong> },
      { detail: '' },
      { detail: 'Endings (finir → fin-)' },
      { term: 'je', detail: <>-is: {TXT.ttip('je finis', 'I finish')}</> },
      { term: 'tu', detail: <>-is: {TXT.ttip('tu finis', 'you finish')}</> },
      { term: 'il / elle / on', detail: <>-it: {TXT.ttip('il finit', 'he finishes')}, {TXT.ttip('elle finit', 'she finishes')}</> },
      { term: 'nous', detail: <>-issons: {TXT.ttip('nous finissons', 'we finish')}</> },
      { term: 'vous', detail: <>-issez: {TXT.ttip('vous finissez', 'you finish')}</> },
      { term: 'ils / elles', detail: <>-issent: {TXT.ttip('ils finissent', 'they finish')}</> },
      { detail: '' },
      { detail: 'Other common -ir verbs:' },
      { term: 'choisir', detail: <>{TXT.ttip('je choisis', 'I choose')}, {TXT.ttip('tu choisis', 'you choose')}</> },
      { term: 'réussir', detail: <>{TXT.ttip('elle réussit', 'she succeeds')}</> },
      { term: 'grandir', detail: <>{TXT.ttip('ils grandissent', 'they grow')}</> },
      { term: 'remplir', detail: <>{TXT.ttip('nous remplissons', 'we fill')}</> },
    ],
  },
  {
    icon: <ArrowsLeftRightIcon size={22} weight="duotone" />,
    title: 'Regular -re Verbs (Verbes en -re)',
    content: [
      { detail: <strong>-re verbs are the smallest regular group. Remove -re from the infinitive. The il/elle form adds no ending — just the bare stem.</strong> },
      { detail: '' },
      { detail: 'Endings (vendre → vend-)' },
      { term: 'je', detail: <>-s: {TXT.ttip('je vends', 'I sell')}</> },
      { term: 'tu', detail: <>-s: {TXT.ttip('tu vends', 'you sell')}</> },
      { term: 'il / elle / on', detail: <>nothing: {TXT.ttip('il vend', 'he sells')}, {TXT.ttip('elle vend', 'she sells')} (no ending added)</> },
      { term: 'nous', detail: <>-ons: {TXT.ttip('nous vendons', 'we sell')}</> },
      { term: 'vous', detail: <>-ez: {TXT.ttip('vous vendez', 'you sell')}</> },
      { term: 'ils / elles', detail: <>-ent: {TXT.ttip('ils vendent', 'they sell')}</> },
      { detail: '' },
      { detail: 'Other common -re verbs:' },
      { term: 'attendre', detail: <>{TXT.ttip("j'attends", 'I wait')}, {TXT.ttip('il attend', 'he waits')}</> },
      { term: 'entendre', detail: <>{TXT.ttip("j'entends", 'I hear')}</> },
      { term: 'répondre', detail: <>{TXT.ttip('elle répond', 'she answers')}</> },
      { term: 'perdre', detail: <>{TXT.ttip('nous perdons', 'we lose')}</> },
    ],
  },
  {
    icon: <FlameIcon size={22} weight="duotone" />,
    title: 'Irregular Verbs (Verbes irréguliers)',
    content: [
      { detail: <strong>These four verbs are the most frequently used in French and must be memorized. They follow no regular pattern.</strong> },
      { detail: '' },
      { detail: 'être (to be)' },
      { term: 'je / tu', detail: <>{TXT.ttip('je suis', 'I am')}, {TXT.ttip('tu es', 'you are')}</> },
      { term: 'il / elle / on', detail: <>{TXT.ttip('il est', 'he is')}, {TXT.ttip('elle est', 'she is')}</> },
      { term: 'nous / vous', detail: <>{TXT.ttip('nous sommes', 'we are')}, {TXT.ttip('vous êtes', 'you are')}</> },
      { term: 'ils / elles', detail: <>{TXT.ttip('ils sont', 'they are')}, {TXT.ttip('elles sont', 'they are')}</> },
      { detail: '' },
      { detail: 'avoir (to have)' },
      { term: 'je / tu', detail: <>{TXT.ttip("j'ai", 'I have')}, {TXT.ttip('tu as', 'you have')}</> },
      { term: 'il / elle / on', detail: <>{TXT.ttip('il a', 'he has')}, {TXT.ttip('elle a', 'she has')}</> },
      { term: 'nous / vous', detail: <>{TXT.ttip('nous avons', 'we have')}, {TXT.ttip('vous avez', 'you have')}</> },
      { term: 'ils / elles', detail: <>{TXT.ttip('ils ont', 'they have')}, {TXT.ttip('elles ont', 'they have')}</> },
      { detail: '' },
      { detail: 'aller (to go)' },
      { term: 'je / tu', detail: <>{TXT.ttip('je vais', 'I go')}, {TXT.ttip('tu vas', 'you go')}</> },
      { term: 'il / elle / on', detail: <>{TXT.ttip('il va', 'he goes')}, {TXT.ttip('elle va', 'she goes')}</> },
      { term: 'nous / vous', detail: <>{TXT.ttip('nous allons', 'we go')}, {TXT.ttip('vous allez', 'you go')}</> },
      { term: 'ils / elles', detail: <>{TXT.ttip('ils vont', 'they go')}, {TXT.ttip('elles vont', 'they go')}</> },
      { detail: '' },
      { detail: 'faire (to do / make)' },
      { term: 'je / tu', detail: <>{TXT.ttip('je fais', 'I do')}, {TXT.ttip('tu fais', 'you do')}</> },
      { term: 'il / elle / on', detail: <>{TXT.ttip('il fait', 'he does')}, {TXT.ttip('elle fait', 'she does')}</> },
      { term: 'nous / vous', detail: <>{TXT.ttip('nous faisons', 'we do')}, {TXT.ttip('vous faites', 'you do')}</> },
      { term: 'ils / elles', detail: <>{TXT.ttip('ils font', 'they do')}, {TXT.ttip('elles font', 'they do')}</> },
    ],
  },
  {
    icon: <ProhibitIcon size={22} weight="duotone" />,
    title: 'Negation (La négation)',
    content: [
      { detail: <strong>To make any verb negative, wrap it with ne...pas. Ne becomes n' before a vowel or silent h.</strong> },
      { detail: '' },
      { detail: 'Structure: subject + ne + verb + pas' },
      { term: 'Affirmative', detail: <>{TXT.ttip('Je parle français', 'I speak French')}</> },
      { term: 'Negative', detail: <>{TXT.ttip('Je ne parle pas français', 'I do not speak French')}</> },
      { detail: '' },
      { detail: "n' before a vowel:" },
      { term: 'Affirmative', detail: <>{TXT.ttip("J'aime le café", 'I like coffee')}</> },
      { term: 'Negative', detail: <>{TXT.ttip("Je n'aime pas le café", 'I do not like coffee')}</> },
      { detail: '' },
      { detail: 'With irregular verbs:' },
      { term: 'avoir', detail: <>{TXT.ttip("Je n'ai pas d'argent", "I don't have any money")}</> },
      { term: 'être', detail: <>{TXT.ttip("Il n'est pas médecin", "He is not a doctor")}</> },
      { term: 'aller', detail: <>{TXT.ttip("Elle ne va pas à l'école", "She is not going to school")}</> },
      { term: 'faire', detail: <>{TXT.ttip("Il ne fait pas froid", "It is not cold")}</> },
      { detail: '' },
      { detail: <strong>In spoken French, ne is often dropped: {TXT.ttip("Je sais pas", "I don't know")} instead of {TXT.ttip("Je ne sais pas", "I don't know")}. Avoid this in formal contexts.</strong> },
    ],
  },
  {
    icon: <KeyIcon size={22} weight="duotone" />,
    title: 'The Essential Two: Être and Avoir',
    content: [
      { detail: <strong>Être and avoir are the two most important verbs in French. Beyond their basic meanings, they have idiomatic uses that do not map directly to English — and they serve as auxiliary verbs for all compound tenses in later units.</strong> },
      { detail: '' },
      { detail: 'Uses of être' },
      { term: 'Identity / description', detail: <>{TXT.ttip('Elle est médecin', 'She is a doctor')} (no article after être + profession)</> },
      { term: 'Nationality / origin', detail: <>{TXT.ttip('Il est français', 'He is French')}, {TXT.ttip('nous sommes de Paris', 'we are from Paris')}</> },
      { term: 'Location', detail: <>{TXT.ttip("je suis à l'école", 'I am at school')}, {TXT.ttip('ils sont ici', 'they are here')}</> },
      { term: "C'est vs. il est", detail: <>{TXT.ttip("C'est mon ami", 'He is my friend')} (identification) vs. {TXT.ttip("Il est sympa", 'He is nice')} (description)</> },
      { detail: '' },
      { detail: 'Uses of avoir' },
      { term: 'Possession', detail: <>{TXT.ttip("j'ai une voiture", 'I have a car')}, {TXT.ttip('tu as du temps?', 'do you have time?')}</> },
      { term: 'Age', detail: <>{TXT.ttip("j'ai vingt ans", 'I am twenty years old')} (literally "I have twenty years")</> },
      { term: 'Physical states', detail: <>{TXT.ttip("j'ai faim", "I'm hungry")}, {TXT.ttip("j'ai soif", "I'm thirsty")}, {TXT.ttip("j'ai froid", "I'm cold")}, {TXT.ttip("j'ai chaud", "I'm hot")}</> },
      { term: 'Emotional states', detail: <>{TXT.ttip("j'ai peur", "I'm afraid")}, {TXT.ttip("j'ai honte", "I'm ashamed")}, {TXT.ttip("j'ai raison", "I'm right")}, {TXT.ttip("j'ai tort", "I'm wrong")}</> },
      { term: 'il y a', detail: <>{TXT.ttip("il y a un problème", 'there is a problem')}, {TXT.ttip("il y a des gens", 'there are people')} (there is / there are)</> },
      { detail: '' },
      { detail: <strong>Both verbs are also used as auxiliaries to form compound tenses such as the passé composé — this is covered in a later unit.</strong> },
    ],
  },
  {
    icon: <CrownIcon size={22} weight="duotone" />,
    title: 'Être and Avoir Conjugations',
    content: [
      { detail: <strong>Être and avoir must be memorized above all others. They appear in nearly every sentence and form the backbone of all compound tenses.</strong> },
      { detail: '' },
      { detail: <ConjugationTable
          title="être"
          titleTooltip="to be"
          tense="présent"
          test={false}
          entries={[
            { pronoun: 'je', form: 'suis', tooltip: 'I am' },
            { pronoun: 'nous', form: 'sommes', tooltip: 'we are' },
            { pronoun: 'tu', form: 'es', tooltip: 'you are' },
            { pronoun: 'vous', form: 'êtes', tooltip: 'you are' },
            { pronoun: 'il / elle / on', form: 'est', tooltip: 'he / she is' },
            { pronoun: 'ils / elles', form: 'sont', tooltip: 'they are' },
          ]}
        /> },
      { detail: '' },
      { detail: <ConjugationTable
          title="avoir"
          titleTooltip="to have"
          tense="présent"
          entries={[
            { pronoun: 'je', form: 'ai', tooltip: 'I have' },
            { pronoun: 'nous', form: 'avons', tooltip: 'we have' },
            { pronoun: 'tu', form: 'as', tooltip: 'you have' },
            { pronoun: 'vous', form: 'avez', tooltip: 'you have' },
            { pronoun: 'il / elle / on', form: 'a', tooltip: 'he / she has' },
            { pronoun: 'ils / elles', form: 'ont', tooltip: 'they have' },
          ]}
        /> },
    ],
  },
]

export function Unit4() {
  const rolodex = useSettingsStore((s) => s.rolodex)

  return (
    <div className="flex flex-col">
      <UnitHeader title="Unit 4: Present Tense Verbs" />

      {rolodex ? (
        <RolodexView sections={sections} />
      ) : (
        <div className="flex-1 px-4 py-4 grid gap-4">
          {sections.map((section, i) => (
            <Card key={i} className={section.cardClass ?? "border-l-4 border-l-[rgba(0,35,149,0.75)] backdrop-blur-md ![background:linear-gradient(to_bottom,rgba(180,190,210,0.08)_0%,rgba(140,155,180,0.04)_100%)]"}>
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
