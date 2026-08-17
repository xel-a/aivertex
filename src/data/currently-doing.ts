interface LinkPart {
  text: string;
  href: string;
  type: 'link';
  target: '_blank' | '_self';
}

type ActivityPart = string | LinkPart;

type Activity = ActivityPart[];

interface CurrentlyDoing {
  updatedAt: string;
  activities: Activity[];
}

export const currentlyDoing: CurrentlyDoing = {
  updatedAt: '8/16/2026',
  activities: [
    [
      'Studying for ',
      {
        text: 'SC-200 certification',
        href: '/about#current-traversal',
        type: 'link',
        target: '_self',
      },
      ' utilizing a voucher from Microsoft AI Skills Fest.',
    ],
    ['Cooking chicken at KFC in the morning, building my portfolio website at night.'],
    ['Playing video games to stay sane'],
    [
      'Listening to ',
      {
        text: 'someone',
        href: 'https://music.youtube.com/playlist?list=OLAK5uy_m-gtPajGgyMQQeEjgJ2XAiXTBR-HiDb_o',
        type: 'link',
        target: '_blank',
      },
      ' who knows how to make a guitar cry.',
    ],
    ['Still chasing that first tech job.'],
  ],
};
