import {
  animate,
  animateChild,
  animation,
  group,
  query,
  sequence,
  stagger,
  style,
  transition
} from '@angular/animations';

enum Duration {
  SLIDE_ROUTE = 400,
  SLIDE_LIST = 200,
  FADE = 200
}

const LIST_CURVE = 'cubic-bezier(0.35, 0, 0.25, 1)';

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
        animate(`${Duration.SLIDE_ROUTE}ms ease-in`, style({
          left: `${-shift}%`,
          opacity: 0
        }))
      ], { optional: true }),
      query(':enter', [
        animate(`${Duration.SLIDE_ROUTE}ms ease-in`, style({
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
      animate(`${Duration.FADE}ms ease-in`, style({
        opacity: 0
      }))
    ], { optional: true }),
    query(':enter', [
      animate(`${Duration.FADE}ms ease-in`, style({
        opacity: 1
      }))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true })
]);

export const slideListItem = (shift = 100) => {
  return [
    transition(':enter', [
      style({
        height: 0,
        opacity: 0,
        transform: `translate(${shift}px)`
      }),
      sequence([
        animate(Duration.SLIDE_LIST, style({
          height: '*',
        })),
        animate(Duration.SLIDE_LIST, style({
          opacity: '*',
          transform: 'none'
        }))
      ])
    ]),
    transition(':leave', [
      sequence([
        animate(`${Duration.SLIDE_LIST}ms ${LIST_CURVE}`, style({
          opacity: '0',
          transform: `translate(-${shift}px)`
        })),
        animate(`${Duration.SLIDE_LIST}ms ${LIST_CURVE}`, style({
          height: 0
        }))
      ])
    ])
  ];
};

export const slideList = (shift = 100) => {
  return [
    transition(':enter', [
      query('.list-group button', [
        style({
          opacity: 0,
          transform: `translateY(-${shift}px)`
        }),
        stagger(30, [
          animate(`${Duration.SLIDE_ROUTE}ms ${LIST_CURVE}`, style({
            opacity: 1,
            transform: 'none'
          }))
        ])
      ], { optional: true })
    ])
  ];
};
