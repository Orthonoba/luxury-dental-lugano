export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'list'; items: string[] }

export interface BlogPost {
  slug: string
  category: string
  title: string
  excerpt: string
  publishedAt: string
  readTime: string
  author: {
    name: string
    initials: string
  }
  body: ContentBlock[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'digital-smile-design-lugano',
    category: 'Digital Smile Design',
    title: 'What is Digital Smile Design and How Does It Work?',
    excerpt:
      'Digital Smile Design is transforming cosmetic dentistry. In this article, we explore the technology, the process, and why seeing your result before treatment begins changes everything.',
    publishedAt: '2026-03-15',
    readTime: '5 min read',
    author: { name: 'Dr. Marco Ferretti', initials: 'MF' },
    body: [
      {
        type: 'paragraph',
        text: 'At Luxury Dental Paradiso in Lugano, we believe that great dentistry begins with a great conversation — and Digital Smile Design (DSD) makes that conversation visual, precise, and deeply personal.',
      },
      {
        type: 'h2',
        text: 'What is Digital Smile Design?',
      },
      {
        type: 'paragraph',
        text: "Digital Smile Design is a planning protocol developed by Brazilian dentist Christian Coachman that uses digital tools — photographs, video, and advanced software — to design your ideal smile before a single tooth is touched. Think of it as architectural blueprinting for your mouth: you don't build a house without drawings, and you shouldn't transform your smile without a plan.",
      },
      {
        type: 'paragraph',
        text: "The process starts with a comprehensive photographic and video analysis of your face, lips, gum line, and teeth. These images are then imported into specialist software where our team can digitally manipulate the shape, size, colour, and proportions of each tooth — always in relation to your unique facial features.",
      },
      {
        type: 'h2',
        text: 'The DSD Process at Our Lugano Clinic',
      },
      {
        type: 'list',
        items: [
          'Facial and dental photography under standardised lighting conditions',
          'Digital analysis mapping facial midlines, lip curves, and smile arcs',
          'Collaborative design session — you see the proposed result on screen in real time',
          'Provisional mock-up fabricated in resin so you can wear your new smile before committing',
          'Final treatment phase: veneers, crowns, or orthodontics guided by the validated design',
        ],
      },
      {
        type: 'blockquote',
        text: '"Seeing your smile before we begin is not a gimmick — it is the only ethical way to proceed. Your approval drives every decision."',
      },
      {
        type: 'h2',
        text: 'Why It Changes Everything',
      },
      {
        type: 'paragraph',
        text: "Traditional cosmetic dentistry relied on the dentist's experience and the patient's imagination — a risky combination. With DSD, the result is co-designed. You can ask for more length, different proportions, or a subtler shade. Nothing is irreversible until you say it is perfect.",
      },
      {
        type: 'paragraph',
        text: 'For patients travelling from Milan, Zurich, or further afield to our Paradiso clinic on Lake Lugano, this also means fewer return visits. The digital workflow condenses what used to take weeks of iterative adjustments into one decisive planning session followed by efficient execution.',
      },
      {
        type: 'h3',
        text: 'Who is a Candidate?',
      },
      {
        type: 'paragraph',
        text: 'DSD is suitable for anyone considering veneers, crowns, smile makeovers, or even orthodontic treatment. It is especially valuable for patients who have difficulty visualising results from verbal descriptions alone — which, in our experience, is almost everyone.',
      },
      {
        type: 'paragraph',
        text: 'If you are ready to see your future smile before you begin, we invite you to book a complimentary consultation at Luxury Dental Paradiso. Bring your questions, your concerns, and your ambitions — we will bring the technology.',
      },
    ],
  },
  {
    slug: 'natural-aesthetic-treatments-lugano',
    category: 'Facial Aesthetics',
    title: 'The Difference Between Natural and Overdone — Why Less is Always More',
    excerpt:
      'In aesthetic medicine, the greatest skill is restraint. We discuss our philosophy of natural-looking results and how we ensure treatments enhance rather than alter.',
    publishedAt: '2026-02-10',
    readTime: '4 min read',
    author: { name: 'Dr. Sofia Bernasconi', initials: 'SB' },
    body: [
      {
        type: 'paragraph',
        text: "There is a certain irony at the heart of aesthetic medicine: the treatments that attract the most attention are usually the ones that have gone wrong. The swollen lips, the frozen foreheads, the faces that seem to belong to a different decade than the body beneath them — these are the results of excess, not expertise.",
      },
      {
        type: 'paragraph',
        text: "At Luxury Dental Paradiso, our aesthetic medicine approach is guided by a single principle: the intervention should be invisible. Patients should look refreshed, rested, and luminous — not treated.",
      },
      {
        type: 'h2',
        text: 'The Anatomy of a Natural Result',
      },
      {
        type: 'paragraph',
        text: "Natural-looking aesthetic results are not accidents. They require a thorough understanding of facial anatomy, the relationship between volume and proportion, and — critically — restraint. Many of the outcomes that patients bring to us as cautionary examples are the product of practitioners who were not fluent in facial anatomy, or who prioritised visible change over appropriate change.",
      },
      {
        type: 'list',
        items: [
          'Assessment of the entire face, not just the area of concern',
          'Treatment planned in relation to age, bone structure, and skin quality',
          'Conservative dosing with the option to add — never to over-inject on the first visit',
          'A follow-up review to assess how results have settled',
          'Honest communication about what is achievable and what is not',
        ],
      },
      {
        type: 'h2',
        text: 'Botulinum Toxin: Precision Over Volume',
      },
      {
        type: 'paragraph',
        text: "The word 'Botox' has become a cultural shorthand for frozen, expressionless faces. Yet in skilled hands, botulinum toxin is one of the most nuanced tools in aesthetic medicine. The difference between a result that preserves expression and one that eliminates it is measured in units and injection points — decisions that take years of training to master.",
      },
      {
        type: 'blockquote',
        text: '"The goal is never to erase movement. It is to soften the lines that movement has written over time, while leaving the signature intact."',
      },
      {
        type: 'h2',
        text: 'Dermal Fillers and the Architecture of the Face',
      },
      {
        type: 'paragraph',
        text: "Hyaluronic acid fillers, when placed correctly, do not add volume — they restore it. The midface descends as we age, the tear troughs deepen, the lips lose their definition. Subtle, strategic replacement of this lost volume can create a result that colleagues and friends cannot quite identify, but universally describe as 'looking well.'",
      },
      {
        type: 'paragraph',
        text: "At our Lugano clinic, we choose filler products based on their rheological properties — how they flow, integrate, and behave under dynamic facial movement. There is no single product for every area. This level of specificity is what separates a truly natural result from a generic one.",
      },
      {
        type: 'h3',
        text: 'Our Commitment to You',
      },
      {
        type: 'paragraph',
        text: "We will always tell you honestly when we believe a treatment is not appropriate, when we think doing less is better than doing more, and when we think the result you are imagining may not serve you well. This is not caution — it is respect. Book a consultation at Luxury Dental Paradiso and discover what thoughtful aesthetics looks like.",
      },
    ],
  },
  {
    slug: 'porcelain-veneers-guide-lugano',
    category: 'Patient Guide',
    title: 'Porcelain Veneers: Everything You Need to Know Before Your Consultation',
    excerpt:
      'Thinking about veneers? This comprehensive guide covers the process, candidacy, longevity, and what to expect — so you can arrive at your consultation fully informed.',
    publishedAt: '2026-01-20',
    readTime: '7 min read',
    author: { name: 'Dr. Marco Ferretti', initials: 'MF' },
    body: [
      {
        type: 'paragraph',
        text: "Porcelain veneers are among the most transformative tools in cosmetic dentistry — thin shells of feldspathic ceramic or lithium disilicate bonded to the front surfaces of the teeth, capable of altering colour, shape, length, and alignment in a single treatment phase. They are also, occasionally, misunderstood.",
      },
      {
        type: 'paragraph',
        text: "This guide is intended to equip you with the information you need before sitting in the consultation chair at Luxury Dental Paradiso. An informed patient makes better decisions, asks better questions, and achieves better outcomes.",
      },
      {
        type: 'h2',
        text: 'What Veneers Can and Cannot Do',
      },
      {
        type: 'paragraph',
        text: "Veneers can correct a remarkable range of concerns: intrinsic staining that does not respond to whitening, minor crowding or spacing, chips and fractures, disproportionate tooth sizes, and gum line irregularities when combined with a minor gingivectomy. What they cannot do is correct significant bite problems, replace missing teeth, or address advanced gum disease — these require different interventions.",
      },
      {
        type: 'list',
        items: [
          'Discolouration from tetracycline or fluorosis that bleaching cannot resolve',
          'Small gaps (diastemas) between the front teeth',
          'Chipped, fractured, or worn edges',
          'Teeth that are too short or too narrow relative to the face',
          'Mild crowding that does not require orthodontic correction',
        ],
      },
      {
        type: 'h2',
        text: 'The Types of Veneer We Offer',
      },
      {
        type: 'h3',
        text: 'Feldspathic Porcelain',
      },
      {
        type: 'paragraph',
        text: "The most aesthetically refined option. Feldspathic veneers are layered by hand by a master ceramist and offer unparalleled translucency and light diffusion — the material that most closely mimics natural enamel. They are also the most technique-sensitive and typically the thinnest, requiring the least tooth reduction.",
      },
      {
        type: 'h3',
        text: 'Lithium Disilicate (e.max)',
      },
      {
        type: 'paragraph',
        text: "An excellent all-around choice that combines aesthetics with higher flexural strength. Lithium disilicate is ideal for patients with parafunction (grinding or clenching) or where the forces on the teeth are higher. The material is pressed in a single block, offering consistency and excellent optical properties.",
      },
      {
        type: 'h2',
        text: 'The Process: What to Expect',
      },
      {
        type: 'list',
        items: [
          'Consultation and diagnosis — facial analysis, photographs, and discussion of goals',
          'Digital Smile Design session — see your proposed result before any preparation',
          'Tooth preparation — removal of a thin layer of enamel (0.3–0.7mm) under local anaesthetic',
          'Impressions or digital scan sent to our ceramic laboratory in Ticino',
          'Provisional veneers placed while your final restorations are fabricated (7–10 days)',
          'Trial smile with provisional approval before final bonding',
          'Definitive bonding with light-cured adhesive resin',
        ],
      },
      {
        type: 'blockquote',
        text: '"We never prepare a tooth until the patient has approved the design in provisional form. The irreversible step comes last, not first."',
      },
      {
        type: 'h2',
        text: 'How Long Do Veneers Last?',
      },
      {
        type: 'paragraph',
        text: "With proper care, porcelain veneers typically last 15–25 years. Longevity depends on oral hygiene, the absence of parafunction, and the quality of both the laboratory work and the bonding protocol. We use fourth and fifth generation bonding systems and work exclusively with ceramists who specialise in cosmetic restorations.",
      },
      {
        type: 'h2',
        text: 'Caring for Your Veneers',
      },
      {
        type: 'list',
        items: [
          'Brush twice daily with non-abrasive toothpaste',
          'Floss daily — the bonding margins at the gum line require attention',
          'Wear a night guard if you have any tendency to grind',
          'Avoid biting nails, ice, or other hard objects with the veneer teeth',
          'Attend biannual hygiene appointments — professional cleaning is safe for porcelain',
        ],
      },
      {
        type: 'paragraph',
        text: "We look forward to welcoming you to Luxury Dental Paradiso in Lugano. Our team will take as long as the consultation requires — there is no clock on a conversation about your smile.",
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug)
}
