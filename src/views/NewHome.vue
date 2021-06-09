<template>
  <b-container>
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
  </b-container>
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
        {
          href: '/dashboard',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          title: 'Kernel',
          icon: 'fa fa-cog',
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
              href: '',
              title: 'Activity Spaces',
              icon: 'fa fa-bars'
            }
          ]
        },
        {
          title: 'Practices',
          icon: 'fa fa-object-group',
          child: [
            {
              href: '/hello',
              title: 'Build'
            },
            {
              href: '/about',
              title: 'Validate'
            }
          ]
        },
        {
          href: '/profile',
          title: 'Profile',
          icon: 'fa fa-user',
          hidden: !this.isLogged
        },
        {
          href: '/sigin',
          title: 'Login',
          icon: 'fa fa-user',
          hidden: this.isLogged
        },
        {
          title: 'Logout',
          icon: 'fa fa-user',
          hidden: !this.isLogged
        }
      ];
    }
  }
}
</script>

<style scoped>
#dashboard-parent {
  padding-left: 280px;
  transition: 0.5s ease;
}

#dashboard-parent.collapsed {
  padding-left: 30px;
}

</style>