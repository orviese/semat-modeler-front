<template>
  <div id="dashboard-parent" :class="[{'collapsed' : collapse}]">
    <div class="mt-5">
      <router-view></router-view>
    </div>
    <sidebar-menu :menu="menuToShow" :width="width" @toggle-collapse="onToggleCollapse" @item-click="onItemClick">
      <template #toggle-icon>
        <i class="fas fa-bars"></i>
      </template>
    </sidebar-menu>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewHome",
  data() {
    return {
      collapse: false,
      width: '250px'
    }
  },
  methods: {
    ...mapActions('account', ['signOut']),
    onToggleCollapse(collapse) {
      this.collapse = collapse;
    },
    onItemClick(event, item) {
      if (item.title === 'Logout') {
        this.signOut();
      }
    }
  },
  computed: {
    ...mapGetters('account', ['getAccount', 'isLogged']),
    menuToShow: function () {
      return [
        {
          header: true,
          title: (this.isLogged ? this.getAccount.name : 'Menu navigation'),
          hiddenOnCollapse: true
        },
       /* {
          href: '/dashboard',
          title: 'Dashboard',
          icon: 'fa fa-archive',
          hidden: !this.isLogged
        },*/
        {
          title: 'Kernel',
          icon: 'fa fa-cog',
          hidden: !this.isLogged,
          child: [
            {
              href: '/areas-of-concern',
              title: 'Areas Of Concern',
              icon: 'fa fa-graduation-cap'
            },
            {
              href: '/alphas',
              title: 'Alphas',
              icon: 'fa fa-spinner'
            },
            {
              href: '/activity-spaces',
              title: 'Activity Spaces',
              icon: 'fa fa-bars'
            },
            {
              href: '/competencies',
              title: 'Competencies',
              icon: 'fa fa-star'
            }
          ]
        },
        {
          title: 'Practices',
          icon: 'fa fa-object-group',
          hidden: !this.isLogged,
          child: [
            {
              href: '/model-practices',
              title: 'Model',
              icon: 'fa fa-terminal'
            },
            {
              href: '/validate-practices',
              title: 'Config Validation',
              icon: 'fa fa-tools'
            }
          ]
        },
        {
          href: '/validate-practices/public/:id',
          title: 'Public Validations',
          icon: 'fa fa-user-check',
          hidden: true
        },
        {
          title: 'Account',
          icon: 'fa fa-user-circle',
          child: [
            {
              href: '/signup',
              title: 'Register',
              icon: 'fa fa-user',
              hidden: this.isLogged
            },
            {
              href: '/profile',
              title: 'Profile',
              icon: 'fa fa-pencil',
              hidden: !this.isLogged
            },
            {
              href: '/signin',
              title: 'Login',
              icon: 'fa fa-key',
              hidden: this.isLogged
            },
            {
              title: 'Logout',
              icon: 'fa fa-sign-out',
              hidden: !this.isLogged
            }
          ]
        }
      ];
    }
  }
}
</script>

<style scoped>
#dashboard-parent {
  padding-left: 255px;
  transition: 0.5s ease;
}

#dashboard-parent.collapsed {
  padding-left: 50px;
}
</style>