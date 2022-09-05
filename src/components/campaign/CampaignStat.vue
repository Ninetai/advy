<template>
  <div class="tab-block">
    <div v-if="description" class="tab-block__inner tab-block__inner_descript">
      <UiCard class="descript descript_stat">
        <div class="statistics">
          <div class="statistics__wrap">
            <h3 class="descript__header descript__header_mrg"><translate>Статистика</translate></h3>
            <div class="graph-legend">
              <p class="graph-legend__text">
                <span class="graph-legend__point graph-legend__point_first"></span><translate>Переходы</translate>
                <span class="graph-span graph-clicks">{{ description.offers_conversions }}</span>
              </p>
              <p class="graph-legend__text">
                <span class="graph-legend__point graph-legend__point_second"></span><translate>Расход</translate>
                <span class="graph-span graph-expenses">{{ description.offers_spend }}</span>
              </p>
              <p class="graph-legend__text">
                <span class="graph-legend__point graph-legend__point_third"></span><translate>Охват</translate>
                <span class="graph-span graph-reach">{{ description.offers_reach }}</span>
              </p>
            </div>
          </div>
          <div class="graph">
            <CampaignStatChart :data="{
              conversions: description.offers_conversions_list,
              spend: description.offers_spend_list,
              reach: description.offers_reach_list,
            }"/>
          </div>
          <div class="statistics__inner">
            <div class="statistics__block">
              <div class="statistics__image statistics__image_one">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.0001 6.50045C15.2044 6.50045 14.4413 6.81652 13.8787 7.37913C13.3161 7.94174 13.0001 8.7048 13.0001 9.50045C13.0001 10.2961 13.3161 11.0592 13.8787 11.6218C14.4413 12.1844 15.2044 12.5004 16.0001 12.5004C16.7957 12.5004 17.5588 12.1844 18.1214 11.6218C18.684 11.0592 19.0001 10.2961 19.0001 9.50045C19.0001 8.7048 18.684 7.94174 18.1214 7.37913C17.5588 6.81652 16.7957 6.50045 16.0001 6.50045ZM11.0001 9.50045C11.0001 8.6854 11.1993 7.88272 11.5805 7.16229C11.9616 6.44186 12.5131 5.82552 13.1869 5.36695C13.8607 4.90838 14.6364 4.62148 15.4464 4.53124C16.2565 4.44099 17.0763 4.55013 17.8345 4.84915C18.5927 5.14818 19.2663 5.62802 19.7967 6.2469C20.327 6.86578 20.6981 7.60493 20.8774 8.39998C21.0568 9.19504 21.0391 10.0219 20.8259 10.8086C20.6127 11.5952 20.2104 12.3178 19.6541 12.9134C21.3505 13.4653 22.8172 14.5621 23.8261 16.0334C23.9668 16.2526 24.0164 16.518 23.9645 16.7733C23.9125 17.0285 23.763 17.2534 23.5478 17.4001C23.3326 17.5467 23.0686 17.6037 22.8121 17.5587C22.5555 17.5138 22.3266 17.3706 22.1741 17.1594C21.1981 15.7274 19.4181 14.5004 17.0001 14.5004C13.1661 14.5004 11.0001 17.5744 11.0001 19.5004C11.0001 19.7657 10.8947 20.02 10.7072 20.2076C10.5196 20.3951 10.2653 20.5004 10.0001 20.5004C9.73484 20.5004 9.48049 20.3951 9.29295 20.2076C9.10542 20.02 9.00006 19.7657 9.00006 19.5004C9.00006 18.8084 9.15806 18.0704 9.46006 17.3434C9.38154 17.2926 9.31051 17.231 9.24906 17.1604C8.42806 16.2264 7.15406 15.5004 5.50006 15.5004C3.84606 15.5004 2.57206 16.2264 1.75106 17.1604C1.57329 17.3493 1.32911 17.4617 1.07005 17.4739C0.810993 17.4861 0.557322 17.3972 0.362572 17.2259C0.167821 17.0547 0.0472247 16.8144 0.0262326 16.5559C0.00524061 16.2974 0.085495 16.0409 0.250059 15.8404C0.840576 15.1684 1.55664 14.6181 2.35806 14.2204C1.71777 13.5956 1.27828 12.794 1.09573 11.9181C0.913177 11.0423 0.995852 10.1319 1.33319 9.30323C1.67054 8.47458 2.24723 7.76529 2.98961 7.26597C3.732 6.76665 4.60638 6.49996 5.50106 6.49996C6.39574 6.49996 7.27012 6.76665 8.0125 7.26597C8.75489 7.76529 9.33158 8.47458 9.66892 9.30323C10.0063 10.1319 10.0889 11.0423 9.90639 11.9181C9.72384 12.794 9.28435 13.5956 8.64406 14.2204C9.33782 14.5648 9.96837 15.0239 10.5091 15.5784C11.1882 14.7238 12.0332 14.0153 12.9931 13.4954C12.3736 13.0299 11.871 12.4266 11.5251 11.7332C11.1791 11.0398 10.9994 10.2753 11.0001 9.50045ZM3.00006 11.0004C3.00006 10.3374 3.26345 9.70152 3.73229 9.23268C4.20113 8.76384 4.83702 8.50045 5.50006 8.50045C6.1631 8.50045 6.79899 8.76384 7.26783 9.23268C7.73667 9.70152 8.00006 10.3374 8.00006 11.0004C8.00006 11.6635 7.73667 12.2994 7.26783 12.7682C6.79899 13.2371 6.1631 13.5004 5.50006 13.5004C4.83702 13.5004 4.20113 13.2371 3.73229 12.7682C3.26345 12.2994 3.00006 11.6635 3.00006 11.0004Z"
                        fill="#367BF2"/>
                </svg>
              </div>
              <div class="statistics__info">
                <p class="statistics__head"><translate>Охват</translate></p>
                <p class="statistics__text">{{ description.offers_reach }}</p>
              </div>
            </div>
            <div class="statistics__block">
              <div class="statistics__image statistics__image_two">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12.778 5.93683C16.915 5.81984 20.435 8.94468 20.938 12.9995H21.481C21.5811 12.9995 21.6788 12.9695 21.7617 12.9134C21.8445 12.8573 21.9086 12.7776 21.9456 12.6846C21.9827 12.5917 21.991 12.4898 21.9695 12.3921C21.948 12.2944 21.8976 12.2053 21.825 12.1365L21.71 12.0275C21.5225 11.844 21.4146 11.5942 21.4096 11.3319C21.4046 11.0695 21.5029 10.8158 21.6833 10.6253C21.8637 10.4348 22.1118 10.3228 22.374 10.3135C22.6362 10.3042 22.8916 10.3983 23.085 10.5756L23.2 10.6846C24.842 12.2385 23.742 14.9994 21.481 14.9994H20.914C20.677 16.3593 19.958 17.4553 19 18.4132V21.9991C19 22.2643 18.8946 22.5186 18.7071 22.7061C18.5196 22.8937 18.2652 22.999 18 22.999H15C14.79 22.9991 14.5854 22.933 14.415 22.8103C14.2447 22.6875 14.1173 22.5142 14.051 22.315L13.684 21.2131C13.5662 20.8596 13.3402 20.5522 13.038 20.3343C12.7357 20.1164 12.3726 19.9992 12 19.9992C11.6274 19.9992 11.2643 20.1164 10.962 20.3343C10.6598 20.5522 10.4338 20.8596 10.316 21.2131L9.949 22.315C9.88265 22.5142 9.75528 22.6875 9.58495 22.8103C9.41462 22.933 9.20996 22.9991 9 22.999H6C5.73478 22.999 5.48043 22.8937 5.29289 22.7061C5.10536 22.5186 5 22.2643 5 21.9991V18.9992C5 18.4712 4.603 17.7893 3.724 17.1413C2.876 16.5153 1.792 16.0893 0.894 15.9933C0.64859 15.9672 0.421522 15.8512 0.256483 15.6677C0.091443 15.4842 9.03628e-05 15.2462 0 14.9994V10.9996C9.91486e-05 10.8139 0.0518831 10.632 0.149552 10.4741C0.247222 10.3162 0.386919 10.1886 0.553 10.1056L2.17 9.29667C2.828 7.46676 4.483 6.43081 6 6.10982V2.99997C6.00019 2.76875 6.0805 2.54474 6.22727 2.36607C6.37405 2.1874 6.57821 2.06511 6.805 2.02002L7.125 2.02202C7.417 2.02202 7.71 2.02402 8 2.05602C10.031 2.28301 12.085 4.05192 12.778 5.93583V5.93683ZM8 6.99978V4.07992C9.231 4.4239 10.882 5.61585 11 7.02378C11.0049 7.16121 11.0377 7.29621 11.0966 7.42049C11.1555 7.54477 11.2391 7.65572 11.3424 7.74653C11.4457 7.83735 11.5664 7.90612 11.6972 7.94862C11.828 7.99113 11.9661 8.00648 12.103 7.99373L12.383 7.96573C15.91 7.60175 19 10.4296 19 13.9994C19 15.0144 18.597 15.9893 17.879 16.7063C17.8138 16.7708 17.7474 16.8341 17.68 16.8963C17.352 17.2013 17 17.5303 17 17.9992V20.9991H15.72L15.581 20.5801C15.3303 19.8287 14.8496 19.1752 14.2069 18.7121C13.5642 18.249 12.7922 17.9998 12 17.9998C11.2078 17.9998 10.4358 18.249 9.79308 18.7121C9.15039 19.1752 8.66968 19.8287 8.419 20.5801L8.279 20.9991H7V18.9992C7 17.5273 5.987 16.3253 4.911 15.5314C4.03735 14.8932 3.04905 14.4291 2 14.1644V11.6176L3.447 10.8936C3.57605 10.8291 3.68961 10.7374 3.77989 10.6249C3.87016 10.5123 3.93502 10.3816 3.97 10.2416C4.33 8.80569 5.826 7.99973 7 7.99973C7.26522 7.99973 7.51957 7.89438 7.70711 7.70685C7.89464 7.51932 8 7.26498 8 6.99978ZM7.5 12.9995C7.89782 12.9995 8.27936 12.8415 8.56066 12.5602C8.84196 12.2789 9 11.8974 9 11.4996C9 11.1018 8.84196 10.7202 8.56066 10.439C8.27936 10.1577 7.89782 9.99963 7.5 9.99963C7.10218 9.99963 6.72064 10.1577 6.43934 10.439C6.15804 10.7202 6 11.1018 6 11.4996C6 11.8974 6.15804 12.2789 6.43934 12.5602C6.72064 12.8415 7.10218 12.9995 7.5 12.9995Z"
                        fill="#EC407A"/>
                </svg>
              </div>
              <div class="statistics__info">
                <p class="statistics__head"><translate>Расход/бюджет</translate></p>
                <p class="statistics__text">
                  ${{ description.offers_spend || 0 }} / ${{ description.budget }}
                  <span class="statistics__span">
                    ({{ isSpent }}%)
                  </span>
                </p>
              </div>
            </div>
            <div class="statistics__block">
              <div class="statistics__image statistics__image_three">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3 14.5005C3 9.53249 7.03 5.50049 12 5.50049C16.97 5.50049 21 9.53249 21 14.5005C21 15.5535 20.67 16.8805 20.071 17.9205C19.464 18.9745 18.738 19.4905 18.019 19.5005C17.535 19.4765 17.179 19.2675 16.515 18.8805C16.371 18.7965 16.213 18.7045 16.037 18.6045C15.087 18.0645 13.87 17.5005 12 17.5005C10.13 17.5005 8.913 18.0635 7.963 18.6045C7.787 18.7045 7.629 18.7965 7.485 18.8805C6.821 19.2675 6.465 19.4765 5.981 19.5005C5.261 19.4905 4.536 18.9745 3.929 17.9205C3.33 16.8805 3 15.5535 3 14.5005ZM12 3.50049C5.925 3.50049 1 8.42849 1 14.5005C1 15.8985 1.42 17.5705 2.196 18.9185C2.959 20.2435 4.225 21.5005 6 21.5005H6.04C7.081 21.4585 7.936 20.9475 8.612 20.5425C8.731 20.4725 8.844 20.4035 8.952 20.3425C9.728 19.9015 10.599 19.5005 12 19.5005C13.401 19.5005 14.272 19.9005 15.048 20.3425C15.156 20.4035 15.268 20.4725 15.388 20.5425C16.064 20.9465 16.918 21.4585 17.96 21.4995L17.98 21.5005H18C19.775 21.5005 21.041 20.2435 21.804 18.9185C22.58 17.5715 23 15.8985 23 14.5005C23 8.42849 18.075 3.50049 12 3.50049ZM16.95 10.9645C17.0455 10.8722 17.1217 10.7619 17.1741 10.6399C17.2265 10.5179 17.2541 10.3867 17.2553 10.2539C17.2564 10.1211 17.2311 9.98943 17.1808 9.86653C17.1305 9.74364 17.0563 9.63199 16.9624 9.53809C16.8685 9.4442 16.7568 9.36995 16.634 9.31967C16.5111 9.26939 16.3794 9.24408 16.2466 9.24524C16.1138 9.24639 15.9826 9.27398 15.8606 9.32639C15.7386 9.3788 15.6282 9.45498 15.536 9.55049L12.518 12.5685C12.0927 12.4545 11.6417 12.484 11.2349 12.6525C10.8282 12.8209 10.4883 13.1189 10.2682 13.5002C10.048 13.8815 9.95984 14.3248 10.0173 14.7613C10.0748 15.1978 10.2747 15.6032 10.586 15.9145C10.8973 16.2258 11.3027 16.4257 11.7392 16.4832C12.1757 16.5406 12.619 16.4525 13.0003 16.2323C13.3816 16.0121 13.6795 15.6723 13.848 15.2655C14.0165 14.8588 14.046 14.4078 13.932 13.9825L16.95 10.9645ZM5 15.5005C5.26522 15.5005 5.51957 15.3951 5.70711 15.2076C5.89464 15.0201 6 14.7657 6 14.5005C6 14.2353 5.89464 13.9809 5.70711 13.7934C5.51957 13.6058 5.26522 13.5005 5 13.5005C4.73478 13.5005 4.48043 13.6058 4.29289 13.7934C4.10536 13.9809 4 14.2353 4 14.5005C4 14.7657 4.10536 15.0201 4.29289 15.2076C4.48043 15.3951 4.73478 15.5005 5 15.5005ZM20 14.5005C20 14.7657 19.8946 15.0201 19.7071 15.2076C19.5196 15.3951 19.2652 15.5005 19 15.5005C18.7348 15.5005 18.4804 15.3951 18.2929 15.2076C18.1054 15.0201 18 14.7657 18 14.5005C18 14.2353 18.1054 13.9809 18.2929 13.7934C18.4804 13.6058 18.7348 13.5005 19 13.5005C19.2652 13.5005 19.5196 13.6058 19.7071 13.7934C19.8946 13.9809 20 14.2353 20 14.5005ZM12 8.50049C12.2652 8.50049 12.5196 8.39513 12.7071 8.20759C12.8946 8.02006 13 7.7657 13 7.50049C13 7.23527 12.8946 6.98092 12.7071 6.79338C12.5196 6.60585 12.2652 6.50049 12 6.50049C11.7348 6.50049 11.4804 6.60585 11.2929 6.79338C11.1054 6.98092 11 7.23527 11 7.50049C11 7.7657 11.1054 8.02006 11.2929 8.20759C11.4804 8.39513 11.7348 8.50049 12 8.50049Z"
                        fill="#6DAE43"/>
                </svg>
              </div>
              <div class="statistics__info">
                <p class="statistics__head"><translate>CTR</translate></p>
                <p class="statistics__text">{{ description.offers_ctr }}%</p>
              </div>
            </div>
            <div class="statistics__block">
              <div class="statistics__image statistics__image_four">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.207 5.18C8.091 5.354 8 5.648 8 6V15C8 15.2652 7.89464 15.5196 7.70711 15.7071C7.51957 15.8946 7.26522 16 7 16C6.73478 16 6.48043 15.8946 6.29289 15.7071C6.10536 15.5196 6 15.2652 6 15V12C6 11.648 5.91 11.354 5.793 11.18C5.697 11.035 5.613 11 5.5 11C5.388 11 5.303 11.035 5.207 11.18C5.091 11.354 5 11.648 5 12V16C5 17.033 5.7 18.14 7.055 19.043C8.387 19.932 10.194 20.5 12 20.5C15.668 20.5 18 18.251 18 16V12C18 11.648 17.91 11.354 17.793 11.18C17.697 11.035 17.613 11 17.5 11C17.388 11 17.303 11.035 17.207 11.18C17.091 11.354 17 11.648 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12V11C15 10.648 14.91 10.354 14.793 10.18C14.697 10.035 14.613 10 14.5 10C14.388 10 14.303 10.035 14.207 10.18C14.091 10.354 14 10.648 14 11V11.5C14 11.7652 13.8946 12.0196 13.7071 12.2071C13.5196 12.3946 13.2652 12.5 13 12.5C12.7348 12.5 12.4804 12.3946 12.2929 12.2071C12.1054 12.0196 12 11.7652 12 11.5V10.5C12 10.148 11.91 9.854 11.793 9.68C11.697 9.535 11.613 9.5 11.5 9.5C11.388 9.5 11.303 9.535 11.207 9.68C11.091 9.854 11 10.148 11 10.5V11C11 11.2652 10.8946 11.5196 10.7071 11.7071C10.5196 11.8946 10.2652 12 10 12C9.73478 12 9.48043 11.8946 9.29289 11.7071C9.10536 11.5196 9 11.2652 9 11V6C9 5.648 8.91 5.354 8.793 5.18C8.697 5.035 8.613 5 8.5 5C8.388 5 8.303 5.035 8.207 5.18ZM11 7.552V6C11 5.352 10.84 4.646 10.457 4.07C10.053 3.465 9.387 3 8.5 3C7.612 3 6.947 3.465 6.543 4.07C6.159 4.646 6 5.352 6 6V9.052C5.83563 9.01708 5.66803 8.99965 5.5 9C4.612 9 3.947 9.465 3.543 10.07C3.159 10.646 3 11.352 3 12V16C3 17.967 4.3 19.61 5.945 20.707C7.612 21.818 9.806 22.5 12 22.5C16.332 22.5 20 19.749 20 16V12C20 11.352 19.84 10.646 19.457 10.07C19.053 9.465 18.387 9 17.5 9C17.169 8.99782 16.8415 9.06742 16.54 9.204C16.5136 9.15859 16.4859 9.1139 16.457 9.07C16.053 8.465 15.387 8 14.5 8C14.031 8 13.624 8.13 13.286 8.34C13.0702 8.07524 12.7976 7.86231 12.4885 7.71693C12.1794 7.57154 11.8416 7.49741 11.5 7.5C11.325 7.5 11.158 7.518 11 7.552Z"
                        fill="#FD9F00"/>
                </svg>
              </div>
              <div class="statistics__info">
                <p class="statistics__head"><translate>Переходы</translate></p>
                <p class="statistics__text">{{ description.offers_conversions || 0 }}</p>
              </div>
            </div>
          </div>
        </div>
      </UiCard>
      <UiCard class="descript descript_task">
        <div class="task">
          <h3 class="descript__header"><translate>Задача</translate></h3>
          <div class="task__wrapper">
            <div class="task__inner">
              <div class="task__block">
                <p class="task__head"><translate>Гео</translate></p>
                <p class="task__text">
                  <span v-if="description.geos && description.geos.length > 0" class="task__geo">
                    <span v-for="geo in description.geos">{{ geo.name }}</span>
                  </span>
                  <span v-else class="task__geo">&mdash;</span>
                </p>
              </div>
              <div class="task__block">
                <p class="task__head"><translate>Тематика</translate></p>
                <p class="task__text">
                  <span v-if="description.blog_category && description.blog_category.length > 0" class="task__theme">
                    <span v-for="category in description.blog_category">{{ category.name }}</span>
                  </span>
                  <span v-else class="task__theme">&mdash;</span>
                </p>
              </div>
            </div>
            <div class="task__inner" v-if="description.barter != 'no'">
              <div class="task__block task__block_barter">
                <p class="task__head"><translate>Бартер</translate></p>
                <p class="task__text">
                  <span class="task__barter-name">{{ description.barter_name }}</span>
                </p>
              </div>
              <div class="task__block">
                <p class="task__head"><translate>Цена бартера</translate></p>
                <p class="task__text">
                  <span class="task__barter-price">{{ description.barter_price }}$</span>
                </p>
              </div>
            </div>
            <div class="task__inner" v-if="description.barter != 'no'">
              <div class="task__block">
                <p class="task__head"><translate>Описание бартера</translate></p>
                <p class="task__text">
                  <span class="task__barter-descr">{{ description.barter_description || 'No description' }}</span>
                </p>
              </div>
            </div>
            <p class="task__head"><translate>Техническое задание</translate></p>
            <div class="task__tabs">
              <div class="head-companies__tabs head-companies__tabs_task">
                <ul class="tabs tabs_task clearfix tab_names" data-tabgroup="second-tab-group">
                  <li v-for="(desc, name, index) in description.description" class="tabs__item tabs__item_task">
                    <a class="tabs__link active" :href="`#${index}`">
                      {{ windowWidth < 768 ? `#${index + 1}` : name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="task__tab">
                <div id="second-tab-group" class="tabgroup blog-section">
                  <div v-for="(desc, name, index) in description.description" class="tab-block" :id="index">
                    <p class="task__text task__text_paragraph" 
                      style="white-space: pre-wrap;"
                      v-html="description.description[name]">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="task__inner">
              <div class="task__block  task__block_barter">
                <p class="task__head"><translate>Дата завершения</translate></p>
                <p class="task__text">
                  <span class="task__date campaign-desc-end-date">{{ description.end_date || '&mdash;' }}</span>
                  <!-- @todo add date format 12.12.12-->
                  ({{ daysLeft < 0 ? 'Expired' : `осталось ${daysLeft} дней` }})
                </p>
              </div>
              <div class="task__block  task__block_age">
                <p class="task__head"><translate>Возраст</translate></p>
                <p class="task__text">
                  {{ `${description.desired_age[0]} - ${description.desired_age[1]} лет` || '&mdash;' }}
                </p>
              </div>
              <div class="task__block">
                <p class="task__head"><translate>Пол</translate></p>
                <p class="task__text">{{ description.sex === 'both' ? 'All' : description.sex }}</p>
              </div>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
    <div v-else><translate>Нет данных</translate></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import UiCard from '@/components/ui/UiCard'
import CampaignStatChart from '@/components/campaign/CampaignStatChart'

export default {
  name: 'CampaignStat',
  components: {
    UiCard,
    CampaignStatChart,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapState({
      campaign: 'campaignData',
      description: 'campaignDescription',
    }),
    isSpent() {
      return this.description.budget > 0
          ? Math.round((this.description.offers_spend / this.description.budget) * 100, 2)
          : 0
    },
    daysLeft() {
      return new Date(this.description.end_date).getSeconds() - new Date().getSeconds();
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
  },
}
</script>

<style scoped lang="scss">
.descript_stat,
.descript_task {
  @media (max-width: 768px) {
    border-radius: 0;
  }
}

.descript_stat, .descript_task {
  height: 635px;
  overflow-y: auto;
}

.statistics__wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
}

.statistics__inner {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 24px;
  @media (max-width: 655px) {
    flex-direction: column;
    align-items: stretch;
    column-gap: 0;
    row-gap: 10px;
  }
}

.statistics__block {
  display: flex;
  align-items: center;
  border: 1px solid var(--very-light-gray);
  border-radius: 16px;
  padding: 16px;
  @media (min-width: 655.02px) {
    width: calc(100% / 2 - 16px);
  }
}

.statistics__image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
}

.statistics__image_one {
  background-color: rgba(59, 153, 213, 0.1);
}

.statistics__image_two {
  background-color: rgba(236, 64, 122, 0.1);
}

.statistics__image_three {
  background-color: rgba(109, 174, 67, 0.1);
}

.statistics__image_four {
  background-color: rgba(253, 159, 0, 0.1);
}

.statistics__head {
  font-size: var(--body-small);
  margin-bottom: 8px;
}

.statistics__text {
  font-size: var(--heading-three);
  font-weight: 700;
}

.statistics__span {
  color: var(--green);
  font-size: var(--body-small);
  font-weight: 500;
  @media (max-width: 655px) {
    width: 100%;
    font-size: var(--caps-small);
  }
}

.task__inner {
  display: flex;
  column-gap: 24px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-gray);
  @media (max-width: 525px) {
    column-gap: 0;
    flex-direction: column;
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
}

.task__block {
  @media (max-width: 525px) {
    margin-bottom: 12px;
  }
}

.task__block_barter {
  width: 254px;
}

.task__block_age {
  width: 144px;
}

.task__tabs {
  padding-top: 8px;
  border-bottom: 16px inset rgba(255, 255, 255, 0.97);
}

.task__head {
  color: var(--light-gray);
  font-size: var(--caps-small);
  margin-bottom: 8px;
  @media (max-width: 655px) {
    font-size: var(--logo-link);
  }
}

.task__text {
  @media (max-width: 655px) {
    font-size: var(--body-small);
  }
}

.task__text_paragraph {
  margin-bottom: 8px;
}

.task__geo,
.task__theme {
  span:not(:last-child):after {
    content: ',';
    margin-right: .25rem;
  }
}
</style>
