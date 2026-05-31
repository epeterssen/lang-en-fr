import { UsersIcon, UserSwitchIcon, QuotesIcon, ArrowRightIcon, ArrowElbowRightIcon, ArrowsClockwiseIcon, MapPinIcon, LinkSimpleIcon } from '@phosphor-icons/react'
import { SectionCard } from '@/components/SectionCard'
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
      { detail: <>Use <em>tu</em> for:</> },
      { term: 'Friends & family', detail: <>Close friends, relatives, romantic partners: {TXT.ttip('Tu viens ce soir?', 'Are you coming tonight?')}</> },
      { term: 'Children', detail: <>Always address children as tu: {TXT.ttip('Tu t\'appelles comment?', 'What\'s your name?')}</> },
      { term: 'Peers', detail: <>Colleagues of similar age and rank, classmates, fellow students</> },
      { term: 'Animals', detail: <>Pets and animals are always tu: {TXT.ttip('Tu as faim?', 'Are you hungry?')}</> },
      { detail: '' },
      { detail: <>Use <em>vous</em> for:</> },
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
      { detail: <strong>Stressed pronouns are used for emphasis, after prepositions, or in short answers. They cannot replace a subject before a verb.</strong> },
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
      { term: 'For emphasis', detail: <>The stressed pronoun reinforces the subject: {TXT.ttip('Moi, je parle français', 'I speak French')}</> },
      { term: 'Standing alone', detail: <>When there is no verb: {TXT.ttip('Qui veut partir? Moi!', 'Who wants to leave? Me!')}</> },
      { term: 'In comparisons', detail: <>{TXT.ttip('Il est plus grand que moi', 'He is taller than me')}, {TXT.ttip('Elle court aussi vite que lui', 'She runs as fast as him')}</> },
    ],
  },
  {
    icon: <ArrowRightIcon size={22} weight="duotone" />,
    title: 'Direct Object Pronouns (Pronoms compléments d\'objet direct)',
    content: [
      { detail: <strong>Direct object pronouns replace the noun that directly receives the action of the verb. They are placed immediately before the conjugated verb.</strong> },
      { detail: '' },
      { term: 'me / m\'', detail: <>{TXT.ttip('Guy me voit', 'Guy sees me')} → {TXT.ttip('Il me voit', 'He sees me')}, {TXT.ttip("Marie m'aime", 'Marie loves me')} → {TXT.ttip("elle m'aime", 'she loves me')}</> },
      { term: 'te / t\'', detail: <>{TXT.ttip('Guy te connaît', 'Guy knows you')} → {TXT.ttip('Il te connaît', 'He knows you')}, {TXT.ttip("Marie t'appelle", 'Marie is calling you')} → {TXT.ttip("elle t'appelle", 'she is calling you')}</> },
      { term: 'le / l\'', detail: <>{TXT.ttip('Guy voit Marc', 'Guy sees Marc')} → {TXT.ttip('Guy le voit', 'Guy sees him')}, {TXT.ttip('Guy entend Marc', 'Guy hears Marc')} (before a vowel: {TXT.ttip("Guy l'entend", 'Guy hears him')})</> },
      { term: 'la / l\'', detail: <>{TXT.ttip('Guy voit Marie', 'Guy sees Marie')} → {TXT.ttip('Guy la voit', 'Guy sees her')}, {TXT.ttip('Guy entend Marie', 'Guy hears Marie')} (before a vowel: {TXT.ttip("Guy l'entend", 'Guy hears her')})</> },
      { term: 'nous', detail: <>{TXT.ttip('Guy nous invite', 'Guy invites us')} → {TXT.ttip('Il nous invite', 'He invites us')}</> },
      { term: 'vous', detail: <>{TXT.ttip('Guy vous cherche', 'Guy is looking for you')} → {TXT.ttip('Il vous cherche', 'He is looking for you')}</> },
      { term: 'les', detail: <>{TXT.ttip('Guy voit les enfants', 'Guy sees the children')} → {TXT.ttip('Guy les voit', 'Guy sees them')}</> },
      { detail: '' },
      { detail: <><strong>In negation, ne...pas wraps <u>the pronoun and the verb</u></strong>: {TXT.ttip('Guy voit Marc', 'Guy sees Marc')} → {TXT.ttip('Guy ne le voit pas', 'Guy does not see him')}</> },
    ],
  },
  {
    icon: <ArrowElbowRightIcon size={22} weight="duotone" />,
    title: 'Indirect Object Pronouns (Pronoms compléments d\'objet indirect)',
    content: [
      { detail: <strong>Indirect object pronouns replace <em>à + person</em> (to whom / for whom). Like direct object pronouns, they go before the conjugated verb.</strong> },
      { detail: '' },
      { term: 'me / m\'', detail: <>{TXT.ttip('Guy me parle', 'Guy speaks to me')} → {TXT.ttip('Il me parle', 'He speaks to me')}, {TXT.ttip("Marie m'écrit", 'Marie writes to me')} → {TXT.ttip("elle m'écrit", 'she writes to me')}</> },
      { term: 'te / t\'', detail: <>{TXT.ttip('Guy te parle', 'Guy speaks to you')} → {TXT.ttip('Il te parle', 'He speaks to you')}, {TXT.ttip("Marie t'écrit", 'Marie writes to you')} → {TXT.ttip("elle t'écrit", 'she writes to you')}</> },
      { term: 'lui', detail: <>{TXT.ttip('Guy parle à Marc', 'Guy speaks to Marc')} → {TXT.ttip('Guy lui parle', 'Guy speaks to him')}, {TXT.ttip('Guy parle à Marie', 'Guy speaks to Marie')} → {TXT.ttip('Guy lui parle', 'Guy speaks to her')}</> },
      { term: 'nous', detail: <>{TXT.ttip('Guy nous parle', 'Guy speaks to us')} → {TXT.ttip('Il nous parle', 'He speaks to us')}</> },
      { term: 'vous', detail: <>{TXT.ttip('Guy vous parle', 'Guy speaks to you')} → {TXT.ttip('Il vous parle', 'He speaks to you')}</> },
      { term: 'leur', detail: <>{TXT.ttip('Guy parle aux enfants', 'Guy speaks to the children')} → {TXT.ttip('Guy leur parle', 'Guy speaks to them')}</> },
      { detail: '' },
      { detail: <strong>Note: <em>lui</em> means "to him" or "to her," not "him/her" as a stressed pronoun. <em>Leur</em> here means "to them," not the possessive adjective leur (their).</strong> },
    ],
  },
  {
    icon: <ArrowsClockwiseIcon size={22} weight="duotone" />,
    title: 'Reflexive Pronouns (Pronoms réfléchis)',
    content: [
      { detail: <strong>Reflexive pronouns are used with pronominal verbs, where the subject acts on itself. They are placed before the verb.</strong> },
      { detail: '' },
      { term: 'me / m\'', detail: <>Myself: {TXT.ttip('je me lève', 'I get up')}, {TXT.ttip("je m'appelle", 'my name is (lit. I call myself)')}</> },
      { term: 'te / t\'', detail: <>Yourself {KeyE.Inf}: {TXT.ttip('tu te lèves', 'you get up')}, {TXT.ttip("tu t'habilles", 'you get dressed')}</> },
      { term: 'se / s\'', detail: <>Himself / herself: {TXT.ttip('il se lève', 'he gets up')}, {TXT.ttip("elle s'appelle Marie", 'her name is Marie')}</> },
      { term: 'nous', detail: <>Ourselves: {TXT.ttip('nous nous levons', 'we get up')}, {TXT.ttip('nous nous parlons', 'we speak to each other')}</> },
      { term: 'vous', detail: <>Yourselves {KeyE.FormOrPlur}: {TXT.ttip('vous vous levez', 'you get up')}</> },
      { term: 'se / s\'', detail: <>Themselves: {TXT.ttip('ils se lèvent', 'they get up')}, {TXT.ttip("elles s'habillent", 'they get dressed')}</> },
      { detail: '' },
      { detail: 'Common pronominal verbs:' },
      { term: "s'appeler", detail: <>To be called: {TXT.ttip('je m\'appelle Jean', 'my name is Jean')}</> },
      { term: 'se lever', detail: <>To get up: {TXT.ttip('il se lève à 7h', 'he gets up at 7')}</> },
      { term: 'se coucher', detail: <>To go to bed: {TXT.ttip('elle se couche tard', 'she goes to bed late')}</> },
      { term: 'se souvenir', detail: <>To remember: {TXT.ttip('je me souviens', 'I remember')}</> },
    ],
  },
  {
    icon: <MapPinIcon size={22} weight="duotone" />,
    title: 'Y and En (Pronoms adverbiaux)',
    content: [
      { detail: <strong>Y and en are adverbial pronouns that replace prepositional phrases. They always go before the conjugated verb.</strong> },
      { detail: '' },
      { detail: <><em>Y</em> replaces à / en / dans + a place or thing (not a person).</> },
      { term: 'Place', detail: <>{TXT.ttip('Tu vas à Paris?', 'Are you going to Paris?')} → {TXT.ttip('Tu y vas?', 'Are you going there?')}</> },
      { term: 'Thing', detail: <>{TXT.ttip('Il pense à son travail', 'He thinks about his work')} → {TXT.ttip('Il y pense', 'He thinks about it')}</> },
      { detail: '' },
      { detail: <><em>En</em> replaces de + noun, or a quantity.</> },
      { term: 'Quantity', detail: <>{TXT.ttip('Tu veux du café?', 'Do you want some coffee?')} → {TXT.ttip('Tu en veux?', 'Do you want some?')}</> },
      { term: 'De + noun', detail: <>{TXT.ttip('Elle parle de son voyage', 'She talks about her trip')} → {TXT.ttip('Elle en parle', 'She talks about it')}</> },
    ],
  },
  {
    icon: <LinkSimpleIcon size={22} weight="duotone" />,
    title: 'Relative Pronouns (Pronoms relatifs)',
    variant: 'red',
    content: [
      { detail: <strong className="text-[rgba(237,41,57,0.6)]">This is an advanced topic covered in a later unit. The overview below is for reference only.</strong> },
      { detail: '' },
      { detail: <>Relative pronouns link a subordinate clause to a noun, allowing you to describe it in more detail.</> },
      { term: 'qui', detail: <>Subject of the relative clause: {TXT.ttip("L'homme qui parle", 'The man who is speaking')}</> },
      { term: 'que / qu\'', detail: <>Direct object of the relative clause: {TXT.ttip('Le livre que je lis', 'The book that I am reading')}</> },
      { term: 'dont', detail: <>Replaces de + noun: {TXT.ttip('Le film dont je parle', 'The film I am talking about')}</> },
      { term: 'où', detail: <>Place or time: {TXT.ttip("La ville où j'habite", 'The city where I live')}</> },
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
            <SectionCard key={i} section={section} />
          ))}
        </div>
      )}
    </div>
  )
}
