<template>
  <footer class="footer">
    <div class="footer__tagline">
      <span class="footer__date">2022</span> © ADVY.AI <span class="footer__span">- <translate>качество и количество</translate></span>
    </div>
    <ul class="footer__menu">
      <li class="footer__item">
        <a href="https://advy.ai" class="footer__link" target="_blank"><translate>О нас</translate></a>
      </li>
      <li class="footer__item">
        <a href="https://t.me/ADVY_Manager_Zakharbot" class="footer__link" target="_blank"><translate>Поддержка</translate></a>
      </li>
      <li class="footer__item">
        <a href="/privacy" class="footer__link" target="_blank"><translate>Политика конфиденциальности</translate></a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px;
  background-color: var(--bg-gray);
  border-top: 1px solid var(--border-footer-gray);
  font-size: var(--caps-small);
  color: var(--footer-gray);
  font-weight: 500;
}
.footer__menu {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
.footer__link {
  color: var(--footer-gray);
  border-bottom: 1px solid transparent;
  transition: all .3s linear;
}
.footer__link:hover {
  border-bottom: 1px solid var(--dark-gray);
}

@media (max-width: 655px) {
  .footer {
    flex-direction: column;
  }
  .footer__tagline {
    margin-bottom: 10px;
  }
  .footer__span {
    display: none;
  }
  .footer__tagline {
    color: var(--blue);
  }
}
@media (max-width: 480px) {
  .footer__menu {
    flex-direction: column;
  }
  .footer__link {
    line-height: 34px;
  }
}
</style>
