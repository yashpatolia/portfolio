import { sleep } from './lib.mjs';
import { settle } from './scenes-live.mjs';

/* Bellhop has no public deploy. These scenes attach to a local copy of the repo running
   `scripts/dev.sh mock` on spare ports (backend 8010, dashboard 5195), whose simulator plays a
   fictional care home. Every resident, nurse and call is invented. Start it before capturing:
   BACKEND_PORT=8010 FRONTEND_PORT=5195 DEMO_PORT=8011 scripts/dev.sh mock --scene busy --rate 4 --speed 2 */
const BASE = 'http://localhost:5195/';

export const bellhop = {
  slug: 'bellhop', title: 'Bellhop', host: 'Bellhop, Cal Hacks 13.0 demo', noLock: true,
  scenes: [
    { alt: 'Landing page: the call bell, answered', run: async (p) => { await p.goto(BASE + '#/'); await settle(p, 1200); } },
    { alt: 'Live nurse dashboard with an escalated emergency, the conversation and the robot fleet', run: async (p) => { await p.goto(BASE + '#/dashboard'); await settle(p, 2500); } },
    { alt: 'Dispatch: pick a room, then send a free robot to it', run: async (p) => { await p.goto(BASE + '#/dispatch'); await settle(p, 1800); } },
    { alt: 'Resident profile with habits, tendencies and what the robot has learned', run: async (p) => { await p.goto(BASE + '#/residents'); await settle(p, 1800); } },
    { alt: 'Insights: calls handled by the robot, nurse time saved and response time target', run: async (p) => { await p.goto(BASE + '#/insights'); await settle(p, 3500); } },
  ],
};
