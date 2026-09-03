import type { Metadata } from 'next'
import Link from 'next/link'
import BlogLayout from '@/components/BlogLayout'

export const metadata: Metadata = {
  title: 'How Much Can You Make in a Home Service Business? (Real Numbers)',
  description: 'What solo operators actually earn in window cleaning, pressure washing and other home service trades. Real reported figures, why gross and net get confused, and how to work out your own number.',
  alternates: { canonical: 'https://www.opervo.io/blog/how-much-can-you-make-home-service-business' },
  openGraph: {
    title: 'How Much Can You Make in a Home Service Business? (Real Numbers) | Opervo',
    description: 'Real reported earnings from working operators, why the question is usually answered wrong, and how to work out your own number.',
    url: 'https://www.opervo.io/blog/how-much-can-you-make-home-service-business',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Much Can You Make in a Home Service Business? (Real Numbers)',
  author: { '@type': 'Person', name: 'Max Ballesteros' },
  datePublished: '2026-09-02',
  dateModified: '2026-09-02',
  image: 'https://www.opervo.io/og-image.png',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.opervo.io/blog/how-much-can-you-make-home-service-business' },
  publisher: { '@type': 'Organization', name: 'Opervo' },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much can a solo home service operator make per year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Working operators most commonly report taking home somewhere between $30,000 and $70,000 in a year, with a smaller number reporting six figures. A 23-participant survey published on the Window Cleaning Resource forum in February 2015 found most respondents paid themselves between $30,000 and $60,000 in net earnings, with a few reporting up to $200,000. These are self-reported figures from people who chose to answer, so treat them as a rough shape rather than a benchmark.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between gross revenue and what I actually take home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gross revenue is everything a customer pays you. Net earnings are what is left after fuel, insurance, equipment, chemicals, vehicle costs, software, marketing and taxes. The two are frequently confused in online discussions, and the gap between them is large. A business grossing $100,000 split between two partners can leave each of them with roughly a third of that once costs come out.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I make in my first year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Less than you will make in year three, and the single biggest reason is that you do not yet have repeat customers. First-year revenue is almost entirely new-customer acquisition, which is the slowest and most expensive way to book work. Operators in these discussions consistently point new entrants toward keeping other income during the first year rather than quoting a first-year figure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are BLS wage figures a good benchmark for a home service business owner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Bureau of Labor Statistics figures such as the May 2025 median annual wage of $38,340 for building cleaning workers measure employee wages, not owner earnings. An owner carries costs and risk an employee does not, and also keeps profit an employee does not. The BLS number is a useful floor to beat, not a forecast of what a business will pay you.',
      },
    },
    {
      '@type': 'Question',
      name: 'What actually determines how much I make?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Season length, the mix of residential and commercial work, your repeat rate, and whether you stay solo or hire. Season length is the constraint most new operators underestimate: an operator in a northern climate may only have around 30 workable weeks in a year, which caps annual revenue regardless of day rate.',
      },
    },
  ],
}

export default function HowMuchCanYouMakeHomeServiceBusiness() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.opervo.io"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.opervo.io/blog"}, {"@type": "ListItem", "position": 3, "name": "How Much Can You Make in a Home Service Business? (Real Numbers)", "item": "https://www.opervo.io/blog/how-much-can-you-make-home-service-business"}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BlogLayout
        category="PRICING"
        title="How Much Can You Make in a Home Service Business? (Real Numbers)"
        date="September 2, 2026"
        readTime="9"
      >
        <p>
          Most solo operators who answer this question publicly report taking home between $30,000 and
          $70,000 a year. A smaller group reports six figures. A meaningful number report less than the
          median wage of an employed cleaner. The spread is enormous, and the reason is that almost
          everyone answering is quietly answering a different question.
        </p>
        <p>
          This is the most asked question in the trades and the worst answered. Below are the actual
          numbers working operators have put in writing, where they came from, and why you should not
          treat any of them as a forecast.
        </p>

        <h2>WHY MOST ANSWERS TO THIS QUESTION ARE USELESS</h2>
        <p>
          When someone says they made $100,000 cleaning windows, they might mean any of three completely
          different things:
        </p>
        <ul>
          <li>
            <strong>Gross revenue.</strong> Everything customers paid them. This is the biggest number
            and the one people quote in public.
          </li>
          <li>
            <strong>Net profit.</strong> What is left after fuel, insurance, equipment, chemicals,
            vehicle payments, software and marketing.
          </li>
          <li>
            <strong>Owner draw.</strong> What actually reached their personal bank account, which may be
            lower than net profit if they reinvested, or structured differently if the business is
            incorporated.
          </li>
        </ul>
        <p>
          You can watch this confusion happen in real time. In a 2015 thread on the Window Cleaning
          Resource forum asking operators what they paid themselves, one respondent stopped to point out
          that people were using &quot;how much did you make&quot; to mean salary taken, business profit,
          and gross revenue interchangeably, and that the answers were therefore not comparable.
        </p>
        <p>
          So before you compare yourself to anyone, get specific about which number you mean. Most of the
          discouragement new operators feel comes from comparing their net against somebody else&apos;s
          gross.
        </p>

        <h2>WHAT OPERATORS ACTUALLY REPORT</h2>
        <p>
          The most useful single data point available publicly is a survey run on the Window Cleaning
          Resource forum and published in February 2015. Twenty-three operators participated. Most had
          been in business three to ten years, most were solo or running one to five employees, and all
          but three did no high-rise work.
        </p>
        <p>
          On net earnings paid to themselves in 2014, the results were scattered, with most responses
          falling between <strong>$30,000 and $60,000</strong> and a few reporting up to{' '}
          <strong>$200,000</strong>.
        </p>
        <p>
          A separate 2017 discussion asking how much a one-person window cleaning operation could make
          produced a similar shape. One experienced operator put the realistic ceiling for most successful
          solo operators at around $70,000. Another said they knew several solo operators grossing
          $150,000 to $160,000 and one above $200,000. A third, working three or four days a week and not
          every week, described being content at about $1,000 a week.
        </p>
        <p>
          On the pressure washing side, a 2014 thread from a new two-person operation reported $1,500 to
          $2,000 per week in sales with a best week above $3,500. An experienced responder did the
          arithmetic out loud: $100,000 gross split between two partners is $50,000 each before costs,
          and after costs closer to $35,000 each.
        </p>
        <p>
          <strong>Read those numbers carefully.</strong> They are self-reported, from people who chose to
          answer publicly, in threads that are now nine to twelve years old, and mostly from one trade in
          one online community. They tell you the rough shape of the distribution. They are not a
          benchmark and they are not adjusted for inflation.
        </p>

        <h2>WHAT THE GOVERNMENT DATA SAYS, AND WHY IT IS THE WRONG BENCHMARK</h2>
        <p>
          The Bureau of Labor Statistics publishes wage data for adjacent occupations. As of the May 2025
          figures, the median annual wage was <strong>$38,340</strong> for building cleaning workers and{' '}
          <strong>$33,960</strong> for landscaping and groundskeeping workers. Janitors and building
          cleaners had a median hourly wage of $17.71.
        </p>
        <p>
          These are <strong>employee wages</strong>. They are not what a business owner earns. An owner
          carries costs, risk and unpaid administrative hours that an employee does not, and in exchange
          keeps profit that an employee does not. Using the BLS median as your target is a mistake in both
          directions: it is too low to be an ambition and too clean to be a comparison.
        </p>
        <p>
          What it is genuinely useful for is a floor. If you are working full time in your own business
          and clearing less than an employed cleaner earns, that is a signal worth acting on, whether the
          fix is your pricing, your route density, or your costs.
        </p>

        <h2>THE FOUR THINGS THAT ACTUALLY MOVE YOUR NUMBER</h2>
        <p>
          Across every one of these discussions, the same four variables explain most of the spread.
        </p>
        <ul>
          <li>
            <strong>Season length.</strong> The one new operators underestimate most. An operator in a
            northern climate raised the point that they have roughly 30 workable weeks in a year. That
            single constraint caps annual revenue no matter how good the day rate is. Run your annual
            projection on your real season, not on 52 weeks.
          </li>
          <li>
            <strong>Repeat rate.</strong> First-year revenue is almost entirely new-customer acquisition,
            which is the slowest and most expensive way to fill a calendar. The operators reporting higher
            numbers are almost always describing a book of repeat customers built over years, not a
            better first year.
          </li>
          <li>
            <strong>Residential versus commercial.</strong> Higher hourly rates are typically available in
            residential work, but the pool of customers willing to pay a premium is finite in any given
            area. Commercial work tends to pay less per hour and offer more predictable volume.
          </li>
          <li>
            <strong>Solo versus crew.</strong> Staying solo caps revenue at what one person can physically
            do inside the season. Hiring raises the ceiling and adds payroll, insurance, management time
            and risk. Both are legitimate. They produce very different businesses.
          </li>
        </ul>

        <h2>HOW TO WORK OUT YOUR OWN NUMBER</h2>
        <p>
          Someone else&apos;s figure is entertainment. Yours is arithmetic. You need four inputs, and you
          probably already have three of them:
        </p>
        <ul>
          <li>Your average job value, which is total revenue divided by number of jobs.</li>
          <li>How many jobs you can realistically complete in a week at your current route density.</li>
          <li>Your real season length in weeks, not the calendar year.</li>
          <li>Your costs per week, including the ones that are easy to forget: fuel, insurance, equipment replacement, and your own unpaid admin time.</li>
        </ul>
        <p>
          Multiply the first three for a gross ceiling. Subtract the fourth across the season for something
          close to net. The result will almost certainly be lower than the number you had in your head,
          and it will be yours.
        </p>
        <p>
          The reason most operators cannot do this in five minutes is not the math. It is that the inputs
          are spread across a notes app, a truck console full of receipts, and memory. If your jobs,
          prices and payments live in one place, average job value and season revenue are things you can
          read rather than reconstruct. That is most of what running{' '}
          <Link href="/">field service software</Link> buys you at this stage, and it is worth being blunt
          that a spreadsheet you actually maintain beats software you do not.
        </p>

        <h2>THE HONEST SUMMARY</h2>
        <p>
          If you are solo, in a full season, with a real repeat book and disciplined pricing, the publicly
          reported range clusters between $30,000 and $70,000 taken home, with a real but smaller group
          above that. First year will be below it. Nobody can tell you your number without knowing your
          season, your rates and your costs, and anyone who quotes you a confident figure without asking is
          selling something.
        </p>
        <p>
          What you can control is knowing your own numbers well enough to spot which of the four variables
          above is the one holding you back.
        </p>

        <h2>SOURCES</h2>
        <ul>
          <li>
            Window Cleaning Resource, operator survey with 23 participants, published February 2015:{' '}
            <a href="https://community.windowcleaner.com/t/salary-how-much-did-you-pay-yourself-in-2014/32354" rel="nofollow noopener" target="_blank">
              Salary: How much did you pay yourself in 2014?
            </a>
          </li>
          <li>
            Window Cleaning Resource, November 2017:{' '}
            <a href="https://community.windowcleaner.com/t/how-much-can-a-one-man-show-make/45197" rel="nofollow noopener" target="_blank">
              How much can a one man show make?
            </a>
          </li>
          <li>
            Pressure Washing Resource, August 2014:{' '}
            <a href="https://pressurewashingresource.com/community/t/how-much-income-should-i-expect-in-my-first-year/4017" rel="nofollow noopener" target="_blank">
              How much income should I expect in my first year?
            </a>
          </li>
          <li>
            U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025:{' '}
            <a href="https://www.bls.gov/ooh/building-and-grounds-cleaning/home.htm" rel="nofollow noopener" target="_blank">
              Building and Grounds Cleaning Occupations
            </a>
          </li>
        </ul>
      </BlogLayout>
    </>
  )
}
