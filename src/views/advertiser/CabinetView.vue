<template>
  <main>
    <NewAccountPopup
        v-if="isOpenedPopup === 'newAccount'"
        @close-popup="onPopupClose"
    />
    <CabinetAddCardPopup
        v-show="isOpenedPopup === 'addCard'"
        :accountId="currentAccountId"
        @close-popup="onPopupClose"
    />
    <CabinetUsersPopup
        v-if="isOpenedPopup === 'users'"
        :account="selectedAccount"
        @close-popup="isOpenedPopup = null"
    />
    <CabinetUpdateAccountPopup
        v-if="isOpenedPopup === 'edit'"
        :id="selectedAccountId"
        @close-popup="onPopupClose"
    />


    <div class="wrapper wrapper_main">
      <!-- ADS companies -->
      <div class="main-content">
        <CabinetHead
            :scene="scene"
            @edit-user="scene = 'edit'"
            @save-account="saveAccount"
        />

        <div class="cabinet-wrapper">
          <UiCard>
            <h3 class="descript__header descript__header_user"><translate>Общая информация</translate></h3>
            <div v-show="scene === 'edit'" class="new-user">
              <div class="new-user__avatar">
                <img src="@/assets/camera.png" class="new-user__image" alt="">
              </div>
              <div class="new-user__form">
                <form action="#" class="user-form" id="user-form">
                  <div class="user-form__block">
                    <input v-model="editForm.name" type="text" class="user-form__field"
                           :placeholder="$gettext('Имя')">
                    <input v-model="editForm.surname" type="text" class="user-form__field"
                           :placeholder="$gettext('Фамилия')">
                    <input v-model="editForm.email" type="email" class="user-form__field"
                           :placeholder="$gettext('Email')" required>
                    <input v-model="editForm.phone" type="tel" class="user-form__field"
                           :placeholder="$gettext('Телефон')" required>
                  </div>
                  <h3 class="user-form__head">Смена пароля</h3>
                  <div class="user-form__block">
                    <input v-model="editForm.password" type="password" class="user-form__field"
                           :placeholder="$gettext('Новый пароль')">
                    <input v-model="editForm.passwordConfirmation" type="password" class="user-form__field"
                           :placeholder="$gettext('Повторите пароль')">
                  </div>
                </form>
                <button @click.prevent="saveAccount"
                        class="form__button form__button_submit user-save user-save_mob"
                        type="submit" form="user-form">
                  Сохранить
                </button>
              </div>
            </div>

            <CabinetUser v-show="scene === 'data'"/>

            <CabinetPay
                :class="{opacity: scene === 'edit'}"
                @add-card="isOpenedPopup = 'addCard'"
            />
          </UiCard>
          <UiCard>
            <CabinetAccounts
                :class="{opacity: scene === 'edit'}"
                @add-account="isOpenedPopup = 'newAccount'"
                @edit-account="editAccount($event)"
                @open-users="openUsers"
                @delete-account="deleteAccountUsers($event)"
            />
          </UiCard>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapActions, mapState} from "vuex";
import CabinetUpdateAccountPopup from '@/components/cabinet/CabinetUpdateAccountPopup';
import NewAccountPopup from '@/components/cabinet/NewAccountPopup';
import CabinetHead from "@/components/cabinet/CabinetHead";
import CabinetUser from "@/components/cabinet/CabinetUser";
import CabinetPay from "@/components/cabinet/CabinetPay";
import CabinetAccounts from "@/components/cabinet/CabinetAccounts";
import CabinetAddCardPopup from "@/components/cabinet/CabinetAddCardPopup";
import CabinetUsersPopup from "@/components/cabinet/CabinetUsersPopup";
import UiCard from "@/components/ui/UiCard";
import {buildGetParams} from "@/functions/buildGetParams";

export default {
  name: 'CabinetView',
  components: {
    CabinetUpdateAccountPopup,
    CabinetUsersPopup,
    CabinetAddCardPopup,
    CabinetHead,
    CabinetUser,
    CabinetPay,
    CabinetAccounts,
    NewAccountPopup,
    UiCard,
  },
  data() {
    return {
      scene: 'data',
      currentAccountId: null,
      selectedAccountId: null,
      isOpenedPopup: null,
      editForm: {
        name: '',
        email: '',
        surname: '',
        phone: '',
        password: '',
        passwordConfirmation: '',
      },
      selectedAccount: null,
    }
  },
  created() {
    this.loadCabinetInfo();
  },
  methods: {
    ...mapActions([
      'getUsersAccount',
      'getUsersProfilePage',
      'deleteUser',
      'putProfileUpdate',
      'putPasswordUpdate',
    ]),
    loadCabinetInfo() {
      this.getUsersAccount()
          .then((response) => {
            let userAccountList = response.data[0];
            this.currentAccountId = userAccountList[0].id;

            this.getUsersProfilePage(this.currentAccountId)
                .then((response) => {
                  const userInfo = response.data[0];

                  this.editForm = {
                    name: userInfo.user_first_name,
                    email: userInfo.user_email,
                    surname: userInfo.user_last_name || '',
                    phone: userInfo.user_phone,
                  };

                  // updateaccountpopupfunction();
                });
          });
      this.scene = 'data';
    },
    saveAccount() {
      if (!!this.editForm.password && !!this.editForm.passwordConfirmation) {
        const passwordData = {
          password: this.editForm.password,
          confirm_password: this.editForm.passwordConfirmation,
        }
        this.putPasswordUpdate(passwordData);
      }
      
      const data = {
        first_name: this.editForm.name,
        last_name: this.editForm.surname,
        email: this.editForm.email,
        phone: this.editForm.phone,
      };

      this.putProfileUpdate(data).then(() => this.loadCabinetInfo());
    },
    editAccount(id) {
      this.selectedAccountId = id;
      this.isOpenedPopup = 'edit';
    },
    deleteAccountUsers(id) {
      if (confirm(this.$gettext('Are you sure you want to delete this account?'))) {
        this.deleteUser(buildGetParams({account_id: id})).then(response => {
          this.$router.push({name: 'cabinet'});
        });
      }
    },
    openUsers(id) {
      this.selectedAccount = this.accountsList.find(account => account.id === id);
      this.isOpenedPopup = 'users';
    },
    onPopupClose(value) {
      this.isOpenedPopup = null;
      if (value) {
        this.loadCabinetInfo();
      }
    }
  },
  computed: {
    ...mapState(['accountsList']),
  },
}
</script>

<style scoped lang="scss">
.cabinet-wrapper {
  display: flex;
  @media (min-width: 900.02px) {
    align-items: flex-start;
    column-gap: 16px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
  @media (min-width: 768.02px) {
    margin-top: 24px;
  }

  .ui-card {
    @media (min-width: 900.02px) {
      width: calc(100% / 2);
    }
    @media (max-width: 900px) {
      margin-top: 6px;
      border-radius: 0;
    }
  }
}

.user-form__block:first-child {
  margin-bottom: 16px;
  border-bottom: 1px solid var(--very-light-gray);
  padding-bottom: 16px;
}

.user-form__block {
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 16px;
}

.user-form__field {
  width: calc(100% / 2 - 16px);
  border: 2px solid var(--very-light-gray);
  color: var(--black);;
  border-radius: 16px;
  font-weight: 500;
  padding: 16px;
}

.user-form__head {
  margin-bottom: 16px;
  color: var(--light-gray);
  font-weight: 600;
}

.user-save {
  width: 235px;
}

.user-save_mob {
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin: 16px auto 0;
  }
  @media (max-width: 420px) {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .user-form__field {
    width: 100%;
  }
  .user-form__block:first-child {
    margin-bottom: 9px;
  }
  .user-form__block {
    column-gap: 0;
  }
}

.new-user {
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px dashed var(--very-light-gray);
  @media (max-width: 768px) {
    align-items: flex-start;
    border: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  @media (max-width: 525px) {
    flex-direction: column;
  }
}

.new-user__avatar {
  width: 252px;
  height: 252px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  cursor: pointer;
  @media (max-width: 525px) {
    margin: 0 auto 24px;
  }
}

.new-user__image {
  object-fit: contain;
}

.new-user__form {
  flex-basis: 69%;
}
</style>
