import { animate, animateChild, group, query, style } from '@angular/animations';

export const slide = (isBackward?) => {
  const shift = (isBackward) ? -100 : 100;

  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        paddingLeft: '15px',
        paddingRight: '15px'
      })
    ]),
    query(':enter', [
      style({
        left: `${shift}%`,
        opacity: 0
      })
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('400ms ease-in', style({
          left: `${-shift}%`,
          opacity: 0
        }))
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease-in', style({
          left: '0%',
          opacity: 1
        }))
      ])
    ]),
    query(':enter', animateChild()),
  ];
};
