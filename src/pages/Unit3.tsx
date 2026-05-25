import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UsersIcon, UserSwitchIcon, QuotesIcon } from '@phosphor-icons/react'
import { RolodexView } from '@/components/RolodexView'
import { UnitHeader, KeyE } from '@/components/UnitHeader'
import { useSettingsStore } from '@/store/settings'
import { TXT } from '@/utils/txt'
import type { Section } from '@/types'

const sections: Section[] = [
  {
    icon: <UsersIcon size={22} weight="duotone" />,
    title: 'Subject Pronouns (Pronoms sujets)',
    content: [
      { detail: <><strong>Every French verb must have an explicit subject pronoun. Unlike English, you cannot drop it. The subject pronoun tells you who is doing the action.</strong></> },
      { detail: '' },
      { detail: 'Singular' },
      { term: 'je (j\')', detail: <>I: {TXT.ttip('je parle', 'I speak')}, {TXT.ttip('j\'aime', 'I like')} (becomes j' before a vowel or silent <em>h</em>)</> },
      { term: 'tu', detail: <>You {KeyE.Inf} singular: {TXT.ttip('tu parles', 'you speak')}, {TXT.ttip('tu es', 'you are')}</> },
      { term: 'il', detail: <>He / It {KeyE.Masc}: {TXT.ttip('il mange', 'he eats')}, {TXT.ttip('il pleut', 'it is raining')}</> },
      { term: 'elle', detail: <>She / It {KeyE.Fem}: {TXT.ttip('elle chante', 'she sings')}, {TXT.ttip('elle arrive', 'she arrives')}</> },
      { term: 'on', detail: <>One / We {KeyE.Inf}: {TXT.ttip('on y va', 'let\'s go')}, {TXT.ttip('on parle français', 'we speak French')} (used in speech instead of nous)</> },
      { term: 'vous', detail: <>You {KeyE.Form}: {TXT.ttip('vous parlez', 'you speak')}</> },
      { detail: '' },
      { detail: 'Plural' },
      { term: 'nous', detail: <>We {KeyE.Form} written: {TXT.ttip('nous parlons', 'we speak')}, {TXT.ttip('nous allons', 'we are going')}</> },
      { term: 'vous', detail: <>You ["you all"] {KeyE.Form}: {TXT.ttip('vous êtes', 'you [all] are')}</> },
      { term: 'ils', detail: <>They {KeyE.Masc}: {TXT.ttip('ils arrivent', 'they arrive')} (used even if only one male is in the group)</> },
      { term: 'elles', detail: <>They {KeyE.Fem}: {TXT.ttip('elles chantent', 'they sing')} (only when every member of the group is feminine)</> },
      { detail: '' },
      { detail: <strong>Note the two uses of <em>vous</em>. It can be singular, formal (to show respect) or plural (to imply "you all"). This is explained more in the next section.</strong> },
    ],
  },
  {
    icon: <UserSwitchIcon size={22} weight="duotone" />,
    title: 'Tu vs. Vous (Formal vs. Informal)',
    content: [
      { detail: <strong>French has two words for "you." Choosing the wrong one can come across as rude or cold. When in doubt, use <em>vous</em>.</strong> },
      { detail: '' },
      { detail: 'Use tu for:' },
      { term: 'Friends & family', detail: <>Close friends, relatives, romantic partners: {TXT.ttip('Tu viens ce soir?', 'Are you coming tonight?')}</> },
      { term: 'Children', detail: <>Always address children as tu: {TXT.ttip('Tu t\'appelles comment?', 'What\'s your name?')}</> },
      { term: 'Peers', detail: <>Colleagues of similar age and rank, classmates, fellow students</> },
      { term: 'Animals', detail: <>Pets and animals are always tu: {TXT.ttip('Tu as faim?', 'Are you hungry?')}</> },
      { detail: '' },
      { detail: 'Use vous for:' },
      { term: 'Strangers', detail: <>Anyone you do not know well: {TXT.ttip('Vous avez l\'heure?', 'Do you have the time?')}</> },
      { term: 'Elders', detail: <>People older than you, especially outside your social circle</> },
      { term: 'Authority', detail: <>Teachers, doctors, employers, officials: {TXT.ttip('Vous pouvez m\'aider?', 'Can you help me?')}</> },
      { term: 'Service', detail: <>Waiters, shopkeepers, receptionists: {TXT.ttip('Vous avez une table?', 'Do you have a table?')}</> },
      { term: 'Plural', detail: <>Always use vous when speaking to two or more people, regardless of formality</> },
    ],
  },
  {
    icon: <QuotesIcon size={22} weight="duotone" />,
    title: 'Stressed Pronouns (Pronoms toniques)',
    content: [
      { detail: <strong>Stressed pronouns are a separate set used for emphasis, after prepositions, and in short answers. They cannot replace a subject before a verb.</strong> },
      { detail: '' },
      { detail: 'Forms' },
      { term: 'moi', detail: <>Me / I: {TXT.ttip('C\'est moi', 'It\'s me')}, {TXT.ttip('avec moi', 'with me')}</> },
      { term: 'toi', detail: <>You: {TXT.ttip('c\'est pour toi', 'it\'s for you')}, {TXT.ttip('chez toi', 'at your place')}</> },
      { term: 'lui', detail: <>Him: {TXT.ttip('sans lui', 'without him')}, {TXT.ttip('c\'est lui', 'it\'s him')}</> },
      { term: 'elle', detail: <>Her: {TXT.ttip('avant elle', 'before her')}, {TXT.ttip('c\'est elle', 'it\'s her')}</> },
      { term: 'nous', detail: <>Us: {TXT.ttip('avec nous', 'with us')}, {TXT.ttip('c\'est nous', 'it\'s us')}</> },
      { term: 'vous', detail: <>You {KeyE.FormOrPlur}: {TXT.ttip('pour vous', 'for you')}, {TXT.ttip('c\'est vous', 'it\'s you')}</> },
      { term: 'eux', detail: <>Them {KeyE.MascOrMix}: {TXT.ttip('sans eux', 'without them')}, {TXT.ttip('c\'est eux', 'it\'s them')}</> },
      { term: 'elles', detail: <>Them {KeyE.Fem}: {TXT.ttip('pour elles', 'for them')}, {TXT.ttip('c\'est elles', 'it\'s them')}</> },
      { detail: '' },
      { detail: 'When to use them:' },
      { term: 'After prepositions', detail: <>{TXT.ttip('avec moi', 'with me')}, {TXT.ttip('chez toi', 'at your place')}, {TXT.ttip('sans lui', 'without him')}, {TXT.ttip('pour elles', 'for them')}</> },
      { term: 'After c\'est', detail: <>{TXT.ttip('C\'est moi', 'It\'s me')}, {TXT.ttip('C\'est lui le professeur', 'He\'s the teacher')}</> },
      { term: 'For emphasis', detail: <>{TXT.ttip('Moi, je parle français', 'I speak French')}: the stressed pronoun reinforces the subject</> },
      { term: 'Standing alone', detail: <>When there is no verb: {TXT.ttip('Qui veut partir? Moi!', 'Who wants to leave? Me!')}</> },
      { term: 'In comparisons', detail: <>{TXT.ttip('Il est plus grand que moi', 'He is taller than me')}, {TXT.ttip('Elle court aussi vite que lui', 'She runs as fast as him')}</> },
    ],
  },
]

export function Unit3() {
  const rolodex = useSettingsStore((s) => s.rolodex)

  return (
    <div className="flex flex-col">
      <UnitHeader title="Unit 3: Pronouns" />

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
