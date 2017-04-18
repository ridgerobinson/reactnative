import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements'

const PROJECTS = [
  {
    id: 1,
    name: 'ShridLife 1',
    avatar_url: 'https://paigesteck13.files.wordpress.com/2013/05/coming-soon.jpg',
    subtitle: 'Angular 1/Ionic 1 Web App',
    experience: 'This web application is built to allow users to register for the ShridLife system, and track their workout trainings and diet plans. The focus of the business aspect relied on the ability for a personal trainer to easily display and track this information for the clients. Users can add, edit, delete or view their workout history and meal history and be able to view some advanced statistics about their habits.<br />At the time of development, I most only had experience in HTML, CSS and PHP, so being my first larger-scale development project using a Javascript Framework with Angular, I expected there to be some learning curves. There were certainly some, but the development was much smoother than anticipated and providing an awesome experience.<br />I also enlisted the help of The Ionic Framework as my intention was to build a hybrid app. This helped my learning as there was a good community of users in Angular & Ionic as well as plenty of documentation to follow. It was definitely my first eye-opening experience to the necessity of Stack Overflow.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/shridlife1_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/shridlife1_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/shridlife1_image2.png' }
    ]
  },
  {
    id: 2,
    name: 'ShridLife 2',
    avatar_url: 'https://paigesteck13.files.wordpress.com/2013/05/coming-soon.jpg',
    subtitle: 'Angular 2/Ionic 2 Native App',
    experience: 'After my first taste of developing with Angular 1/Ionic 2 for ShridLife 1, I was raring to get started on a whole new framework, and that is exactly what I did here as Angular 2 was/is a complete re-write from Angular 1. This meant more learning, but I only was looking at it from the idea that there must be A TON of improvement to do an entire rewrite. During my learning on Angular 1, the development community was pushing hard for people to switch to Angular 2, and I could clearly see why, especially if you were going to be using Ionic 2 as well like I was. The architecture was completely redone in an effort to allow "pages" to be easily copied from one project to the next. At least that is how I thought about it.<br />I liked how everything from the controller to the service to the CSS was all in one place. At this time I also started working towards creating a REST API.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/shridlife2_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/shridlife2_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/shridlife2_image2.png' }
    ]
  },
  {
    id: 3,
    name: 'ShridLife 3',
    avatar_url: 'https://paigesteck13.files.wordpress.com/2013/05/coming-soon.jpg',
    subtitle: 'React Native Mockup',
    experience: 'The more development work I was doing on Angular, the more I was hearing of React and React Native. I really enjoyed learning Angular, but was also impressed with the praise I saw towards React so I (temporarily) threw in my Angular towel and jumped on board to React. I was very impressed by the fact that there is a clear difference between writing JSX versus regular Javascript. As React Native actually writes native code, it has higher performance off-the-shelf.<br />The core idea behind React is the idea of using components as the building blocks of the application. Coupled with using Flux, React Native (or React for that matter) re-renders itself whenver the state of the application changes. In this way, when an event is triggered in the application, it will dispatch an action that causes an update of the store (similar to the $scope in Angular), that in turn causes the front-end to be re-rendered with the new state. This initially seemed WAY overcomplicated for a simple application or piece of an app such as a form. Every time the user presses a key, an action is called that updates the application state, which in then turn causes a re-render of the elements. As these elements are (in Angular terms) "modeled" on the state, the new text is shown. However, this can lead to some really nice performance enhancements elsewhere and provide an easy and organized code structure. Overall, I am very excited to continue my growth with both React and React Native (and the countless additional tools such as Flux, Router, etc).',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/shridlife3_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/shridlife3_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/shridlife3_image2.png' }
    ]
  },
  {
    id: 4,
    name: 'Tipping Manager',
    avatar_url: 'https://paigesteck13.files.wordpress.com/2013/05/coming-soon.jpg',
    subtitle: 'PHP, Bootstrap Web App',
    experience: 'This application was developed using PHP as the brain of it, and Bootstrap as the dress. The purpose of this tool is to manage user\'s tipping accounts (sports betting accounts). We are able to add parlays that are tracked according to betting site\'s required deposit, bonus and rollover, and manage them game-by-game. Advanced Statistics and deep search capabilities make this application very important for us.<br />I learned a lot about MySQL when developing this application, as this was my database of choice. I found the ability to join many tables based on foreign keys to be incredibly important to understand, and helped to normalize my data appropriately for scalability. I had to create some enormous queries that are loaded with IF/ELSE statements, IFNULL statements, SELECTS inside SELECTS...I\'m sure there was a better way to find the query, but it was an amazing experience having to think through some very advanced statistic retrievals.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/tippingmanager_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/tippingmanager_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/tippingmanager_image2.png' }
    ]
  },
  {
    id: 5,
    name: 'SoccerLife Web Admin',
    avatar_url: 'http://soccerlife.oppmar.com/public_images/app_logo_dark_soccerlife.png',
    subtitle: 'Stripe, PHP, Bootstrap Web Admin',
    experience: 'I was a part of a development team that worked towards creating a native application (built in Swift and Java) that was going to be used as a "base" to build other apps off of. So this main app would have many tools and features, color options, text/content options that an app administrator could choose from to customize their own app. My role in the development was to manage overseas developers while building a web administration in PHP, Bootstrap and jQuery. This was one of my first projects where I focused much more on UI/UX as most of my other projects to this point had been personal or mostly data-driven internal projects, so I was quite excited to get going.<br />I utilized the jQuery library as it helped me to get off the ground quickly. Similarly, I used Bootstrap for styling and was able to create a very cool piece of software. Finally, I allowed users to make online payments for the membership subscriptions through the use of Stripe.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/soccerlifewebadmin_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/soccerlifewebadmin_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/soccerlifewebadmin_image2.png' }
    ]
  },
  {
    id: 6,
    name: 'Playerocity',
    avatar_url: 'http://california-local.rushsoccer.com/images/Logos/Playerocity_Logo.png',
    subtitle: 'Web Host Experience, AWS, DNS',
    experience: 'I have experience as a web site host and manager. I bought server space, and subsequently rented out the space in hosting fees to client websites. Many of these websites I built myself, generally through Joomla! as it remained in the budget for the clients this way. Part of my responsibilities included DNS management, Email Services (such as creating new email addresses and mananging spam, greylisting, etc). I have learned how to connect on SSH to an Amazon AWS EC2 server as well as other AWS services such as S3, Glacier and CloudFront.<br />I worked with both cPanel and WHM to manage these sites. This has been one of my most important development experience even though I wasn\'t directly learning or writing programming in these tasks. I learned about how websites, and the Internet itself, works and how spammers look to attack sites.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/playerocity_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/playerocity_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/playerocity_image2.png' }
    ]
  },
  {
    id: 7,
    name: 'Rush Soccer',
    avatar_url: 'http://kentucky-local.rushsoccer.com/images/Rush%20Logo%20White.jpg',
    subtitle: 'Joomla! Website',
    experience: 'Rush Soccer is the largest youth soccer club in the world with nearly 40,000 players. I was a part of the team that developed their Rush National website and their roughly 50 local clubs worldwide. All of these sites were built using Joomla!. I learned much about daily communication and interaction with this contract as everything done with Rush Soccer was done professionally. They are an ambitious club and only expect the best, and it certainly kept me to continue improving in all aspects of hosting and web development. I had to stay organized very well to manage over 50 websites. This included technical support to all local web administrators.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/rushsoccer_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/rushsoccer_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/rushsoccer_image2.png' }
    ]
  },
  {
    id: 8,
    name: 'LaPlayaMaya',
    avatar_url: 'http://laplayamaya.com/images/design/LogoWhiteBehind_CutOutSmall.png',
    subtitle: 'Joomla! Website',
    experience: 'A restaurant chain based in the Dallas/Ft. Worth area, La Playa Maya was one of my more favorite websites to build. It was my first where I was asked to add a lot of custom CSS. I used a Joomla! template and dug in very deep into the PHP modules and got a very good understanding of how to build and update a custom PHP site.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/laplayamaya_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/laplayamaya_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/laplayamaya_image2.png' }
    ]
  },
  {
    id: 9,
    name: 'Dynamos Soccer',
    avatar_url: 'http://dynamossoccer.com/images/logo_small_3.png',
    subtitle: 'Joomla! Website',
    experience: 'Another one of my favorite Joomla! sites, Dynamos Soccer Club is a youth soccer club based in Houston, TX. The colors work very well together, and with some custom styling and Joomla! modules, the website turned out perfectly for the client.',
    images: [
      { id: 1, uri: 'http://ridgerobinson.com/images/dynamossoccer_introimage.png' },
      { id: 2, uri: 'http://ridgerobinson.com/images/dynamossoccer_image1.png' },
      { id: 3, uri: 'http://ridgerobinson.com/images/dynamossoccer_image2.png' }
    ]
  }
]

class ProjectsScreen extends Component {
  static navigationOptions = {
    title: 'Projects',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="apps" size={30} color={tintColor} />
      }
    }
  }

  onSelectProject = (project) => {
    this.props.navigation.navigate('project', { project });
  }

  renderProjects(projects) {
    return projects.map((project) => {
      return(
        <ListItem
          roundAvatar
          avatar={{ uri: project.avatar_url }}
          subtitle={ project.subtitle }
          key={ project.id }
          title={ project.name }
          onPress={() => this.onSelectProject(project)}
        />
      );

    });
  }

  render() {
    return(
      <ScrollView>
        <List containerStyle={{marginBottom: 20}}>
          {this.renderProjects(PROJECTS)}
        </List>
      </ScrollView>
    );
  }
}

export default ProjectsScreen;
