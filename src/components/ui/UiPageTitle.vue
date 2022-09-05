<template>
  <h2 class="ui-page-title">
    <router-link :to="{name}" class="ui-page-title__link">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M7.80481 2.86219C7.9298 2.98722 8.00001 3.15676 8.00001 3.33355C8.00001 3.51033 7.9298 3.67988 7.80481 3.80491L4.27597 7.33375H13.3338C13.5106 7.33375 13.6802 7.40399 13.8052 7.52902C13.9302 7.65405 14.0005 7.82363 14.0005 8.00045C14.0005 8.17727 13.9302 8.34684 13.8052 8.47188C13.6802 8.59691 13.5106 8.66715 13.3338 8.66715H4.27597L7.80481 12.196C7.92626 12.3217 7.99346 12.4901 7.99194 12.6649C7.99042 12.8398 7.9203 13.007 7.79669 13.1306C7.67308 13.2542 7.50586 13.3243 7.33106 13.3258C7.15625 13.3273 6.98784 13.2601 6.8621 13.1387L2.1952 8.4718C2.07021 8.34678 2 8.17723 2 8.00045C2 7.82366 2.07021 7.65412 2.1952 7.52909L6.8621 2.86219C6.98712 2.73721 7.15667 2.66699 7.33346 2.66699C7.51024 2.66699 7.67979 2.73721 7.80481 2.86219Z"
              fill="#367BF2"></path>
      </svg>
    </router-link>
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'UiPageTitle',
  props: ['name'],
}
</script>

<style scoped lang="scss">
.ui-page-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--heading-three);
  color: var(--black);
  font-weight: 700;
  @media (max-width: 655px) {
    font-size: var(--body);
  }
}

.ui-page-title__link {
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(0deg, #EEEEEE, #EEEEEE);
}
</style>
