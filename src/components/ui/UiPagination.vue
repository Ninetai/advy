<template>
  <div data-app>
    <div v-if="windowWidth >= 768" class="ui-pagination">
      <div class="ui-pagination__show">
        <div class="ui-pagination__head"><translate>Показывать по</translate></div>
        <v-select
            v-model="currentPerPage"
            @change="$emit('update:perPage', $event)"
            :items="items"
            outlined
        ></v-select>
      </div>
      <div class="ui-pagination__paginate">
        <v-pagination
            v-model="currentPage"
            :length="currentPageCount"
        ></v-pagination>
      </div>
    </div>
    <div v-else class="more">
      <button type="button" class="btn-more__button"><translate>Загрузить еще</translate></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiPagination',
  props: ['page', 'perPage', 'pageCount', 'items'],
  data() {
    return {
      windowWidth: window.innerWidth,
      currentPage: 0,
      currentPerPage: 0,
      currentPageCount: 0,
    }
  },
  watch: {
    page: {
      handler(value) {
        this.currentPage = value;
      },
      deep: true,
      immediate: true
    },
    currentPage() {
      this.$emit('update:page', this.currentPage);
    },
    perPage: {
      handler(value) {
        this.currentPerPage = value;
      },
      deep: true,
      immediate: true
    },
    pageCount: {
      handler(value) {
        this.currentPageCount = value;
      },
      deep: true,
      immediate: true
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
  },
}
</script>

<style scoped lang="scss">
.ui-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
}


.ui-pagination__show {
  display: flex;
  align-items: center;
}

.ui-pagination__head {
  margin-right: 1rem;
  font-size: var(--body-small);
  font-weight: 500;
}

.ui-pagination__paginate {
  position: relative;
  padding-right: 36px;
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.pagination__list {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.pagination__arrow {
  position: absolute;
  top: 13px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(156, 162, 184, 0.3);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 4px;
  border: none;
  cursor: pointer;
  transition: all .3s linear;
}

.pagination__arrow:hover {
  background-color: var(--blue);
}

.pagination__arrow_left {
  background-image: url('@/assets/icons/paginate-arr-left.svg');
  top: 14px;
  left: -28px;
}

.pagination__arrow_right {
  background-image: url('@/assets/icons/paginate-arr-right.svg');
  right: 8px;
}

.paginate {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  background-color: var(--white);
  border-radius: 16px;
  cursor: pointer;
}

.paginate_active {
  opacity: .5;
}

.paginate_more {
  background-color: transparent;
  color: var(--very-light-gray);
}

.more {
  display: none;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    display: flex;
  }
}

.btn-more__button {
  max-width: 100%;
  width: 330px;
  border: 1px solid var(--blue);
  font-weight: 700;
  color: var(--blue);
  background-color: var(--white);
  padding: 16px;
  border-radius: 16px;
  transition: all .3s linear;
  @media (max-width: 360px) {
    width: 271px;
  }
}

.btn-more__button:hover {
  background-color: var(--blue);
  color: var(--white);
}
</style>
