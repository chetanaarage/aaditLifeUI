import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { Login } from '../login/login';
import { OAuthProvidersListPage } from '../oauth/list/oauth-providers.list.page';
import { ResponseUtility } from '../../providers/response-utility';
import { RegisterPage } from '../users/register';
import { Config } from '../../providers/config';
import { LoginProvider } from '../../providers/login-provider';
import { Events } from 'ionic-angular';
import { ContactPage } from '../static/contact';
import { Menu } from './menus';
import { HomeEvents } from '../../providers/home-events';
import { GoalForm } from '../goals/goal-form';
import { ScheduleDetails } from '../schedules/schedule-details';
import { FoodLogs } from '../food-logs/food-logs';
import { Platform } from 'ionic-angular';
// import { Oauth } from "ng2-cordova-oauth/oauth"
// import { Google } from "ng2-cordova-oauth/provider/google";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements Menu {

  @ViewChild(ScheduleDetails) scheduleDetails: ScheduleDetails;

  currentUser: any;
  registerCareHome = false;



  constructor(public navCtrl: NavController,
    public respUtility: ResponseUtility,
    public tokenService: Angular2TokenService,
    public config: Config,
    public events: Events,
    public homeEvents: HomeEvents,
    private loginProvider: LoginProvider, private platform: Platform) {


    this.homeEvents.registerMenu(this);
    this.events.subscribe('user:login:success', () => {
      this.currentUser = tokenService.currentUserData;
      // Ensure that the scheduleDetails available are shown
      if (this.scheduleDetails) {
        this.scheduleDetails.loadTodaysSchedule();
        this.scheduleDetails.hideNavbar();
      }
    });
  }

  // public login() {
  //   this.oauth = new Oauth();
  //   this.provider = new Google({
  //     clientId: "387943633858-nlnom38hab8epps1gfip6n7pmnlbkkt5.apps.googleusercontent.com",
  //     appScope: ["email"]
  //   });
  //   this.platform.ready().then(() => {
  //     this.oauth.logInVia(this.provider).then((success) => {
  //       alert(JSON.stringify(success));
  //     }, (error) => {
  //       console.log(JSON.stringify(error));
  //     });
  //   });
  // }


  displayMsgs() {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage ');
    if (this.currentUser && this.scheduleDetails) {
      // Ensure that the scheduleDetails available are shown
      this.scheduleDetails.loadTodaysSchedule();
      this.scheduleDetails.hideNavbar();
    };

  }


  login() {
    this.navCtrl.push(OAuthProvidersListPage);
  }


  logout() {
    this.respUtility.trackEvent("User", "Logout", "click");
    this.loginProvider.logout();
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  contact() {
    this.navCtrl.push(ContactPage);
  }

  setupGoals() {
    this.navCtrl.push(GoalForm, {})
  }

  setupFitnessTest() {
    this.navCtrl.push(GoalForm, {})
  }

}
