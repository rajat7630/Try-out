<style>
  .LoaderBalls {
    width: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .LoaderBalls__item {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    @apply bg-elight;
  }
  .LoaderBalls__item:nth-child(1) {
    animation: bouncing 0.4s alternate infinite
      cubic-bezier(0.6, 0.05, 0.15, 0.95);
  }
  .LoaderBalls__item:nth-child(2) {
    animation: bouncing 0.4s 0.1s alternate infinite
      cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
  }
  .LoaderBalls__item:nth-child(3) {
    animation: bouncing 0.4s 0.2s alternate infinite
      cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
  }

  @keyframes bouncing {
    0% {
      transform: translate3d(0, 10px, 0) scale(1.2, 0.85);
    }
    100% {
      transform: translate3d(0, -20px, 0) scale(0.9, 1.1);
    }
  }
</style>

<div class="LoaderBalls">
  <div class="LoaderBalls__item" />
  <div class="LoaderBalls__item" />
  <div class="LoaderBalls__item" />
</div>
