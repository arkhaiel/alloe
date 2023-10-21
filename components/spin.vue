<template>
  <svg viewBox="0 0 1000 1000" width="5rem" height="5rem" class="wrapper">
      .pen { transform-origin: center; }
    
    
    <path v-for="p in nb_pen" :key="p" class="pen" :class="'pen'+p" d="M 445.16 133.675 C 442.106 134.092 439.538 134.508 439.468 134.508 C 439.329 134.577 439.26 180.741 439.26 237.107 L 439.26 339.707 L 469.666 419.675 C 499.515 498.394 500.001 499.644 500.971 497.422 C 501.457 496.242 515.133 460.422 531.307 417.87 L 560.74 340.608 L 560.74 237.315 L 560.74 134.022 L 555.534 133.259 C 552.618 132.842 549.982 132.495 549.633 132.495 C 549.217 132.495 548.87 163.038 548.8 214.616 L 548.592 296.737 L 535.472 281.257 C 528.253 272.719 522.214 265.916 522.006 266.055 C 521.867 266.263 516.938 277.37 511.038 290.835 C 505.207 304.234 500.348 315.34 500.209 315.41 C 500.07 315.549 495.14 304.442 489.241 290.698 C 483.341 277.021 478.272 265.916 478.064 265.984 C 477.786 266.055 471.747 273.134 464.529 281.604 L 451.408 297.153 L 451.061 214.963 L 450.714 132.842 L 445.16 133.675 Z M 487.921 317.006 L 500.001 344.912 L 501.528 341.649 C 502.361 339.775 507.982 327.002 514.023 313.119 C 520.062 299.305 525.199 287.989 525.407 287.989 C 525.685 287.989 531.099 294.099 537.416 301.596 L 548.939 315.202 L 548.939 327.141 L 548.87 339.013 L 536.444 371.637 L 524.088 404.264 L 500.209 404.472 L 476.33 404.611 L 463.696 371.29 L 451.061 337.901 L 451.061 326.655 L 451.13 315.41 L 463.07 301.388 C 470.22 292.848 475.148 287.643 475.426 288.199 C 475.634 288.615 481.257 301.596 487.921 317.006 Z"></path>

  </svg>
  </template>
  
  <script lang="ts" setup>
  const nb_pen = 6
  </script>
  
  <style>
      .pen { 
        transform-origin: center;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
      .pen1 {
        animation-name: pen1;
      }
  
      .pen2 {
        animation-name: pen2;
        transform: rotate(60deg);
      }
      .pen3 {
        animation-name: pen3;
        transform: rotate(120deg);
      }
      .pen4 {
        animation-name: pen4;
        transform: rotate(180deg);
      }
      .pen5 {
        animation-name: pen5;
        transform: rotate(240deg);
      }
      .pen6 {
        animation-name: pen6;
        transform: rotate(300deg);
      }
  
      @keyframes pen1 {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(360deg);
        }
        100% {
          transform: rotate(720deg);
        }
      }
      @keyframes pen2 {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(60deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes pen3 {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(120deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes pen4 {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes pen5 {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(240deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes pen6 {
        0% {
          transform: rotate(0);
        }
        50% {
          transform: rotate(300deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>