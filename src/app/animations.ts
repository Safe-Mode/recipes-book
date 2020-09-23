import { animate, animateChild, animation, group, query, sequence, style } from '@angular/animations';

enum Duration {
  slide = 400,
  fade = 200
}

const baseRouteAnimationSteps = [
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
  ])
];

export const slide = (isBackward?) => {
  const shift = (isBackward) ? -100 : 100;

  return [
    ...baseRouteAnimationSteps,
    query(':enter', [
      style({
        left: `${shift}%`,
        opacity: 0
      })
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate(`${Duration.slide}ms ease-in`, style({
          left: `${-shift}%`,
          opacity: 0
        }))
      ], { optional: true }),
      query(':enter', [
        animate(`${Duration.slide}ms ease-in`, style({
          left: '0%',
          opacity: 1
        }))
      ])
    ]),
    query(':enter', animateChild())
  ];
};

export const fade = animation([
    ...baseRouteAnimationSteps,
  query(':enter', [
    style({
      opacity: 0
    })
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  sequence([
    query(':leave', [
      animate(`${Duration.fade}ms ease-in`, style({
        opacity: 0
      }))
    ], { optional: true }),
    query(':enter', [
      animate(`${Duration.fade}ms ease-in`, style({
        opacity: 1
      }))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true })
]);
