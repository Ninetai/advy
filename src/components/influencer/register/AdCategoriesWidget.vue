<template>
  <UiTargetInput :placeholder="$gettext('Что бы ты хотел рекламировать?')" :list="value"
          @remove-item="removeCategory($event)"
          style="margin-bottom: 1rem">
    <UiTargetButton class="ui-target-input__button">
      <UiTargetPopup :value.sync="pretype" :list="filtered_ad_categories" @add-item="addCategory($event)"/>
    </UiTargetButton>
  </UiTargetInput>
</template>

<script>
  import {mapActions} from "vuex"
  import UiTargetInput from '@/components/ui/UiTargetInput'
  import UiTargetButton from '@/components/ui/UiTargetButton'
  import UiTargetPopup from '@/components/ui/UiTargetPopup'

  export default {
    components: {
      UiTargetInput,
      UiTargetButton,
      UiTargetPopup
    },
    props: {
      value: Array
    },
    data() {
      return {
        values: [],
        pretype: '',
        ad_categories: []
      }
    },
    computed: {
      filtered_ad_categories() {
        let result = [];
        for (let i=0; i<this.ad_categories.length; i++) {
          let cat = this.ad_categories[i];
          if (((!this.pretype) || (cat.name.toLowerCase().indexOf(this.pretype.toLowerCase()) > -1))) {
            if (this.values.indexOf(cat) == -1) {
              result.push(cat)
            }
          }
        }
        return result
      }
    },
    mounted() {
      this.getAdCategoryList().then(
        response => this.ad_categories = response.data
      )
    },
    methods: {
      ...mapActions(['getAdCategoryList']),
      onChange() {
        this.$emit('input', this.values);
        this.pretype = ''
      },
      addCategory(item) {
        if (this.values.filter(category => category.id === item.id).length > 0) {
          return;
        }
        this.values = [
          ...this.values,
          item
        ];
        this.onChange()
      },
      removeCategory(id) {
        this.values = this.values.filter(category => category.id !== id);
        this.onChange()
      },
    }
  }
</script>
