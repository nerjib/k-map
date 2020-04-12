import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Signin from './signin'
import Async from './async'
import Home from './home';
import Tasks from './tasks/task';
import TaskDetails from './tasks/taskDetails';
import Form from './tasks/form';
import Drafts from './drafts';
import DraftedMsg from './draftedMsg';
import ReportsList from './reportlists';
import SupervisionTemplate from './tasks/guides/pdfs/supervisiontemplate';
import BoreholeGuide from './tasks/guides/pdfs/boreholeguide';
import Pdf1 from './tasks/guides/pdfs/pdf1';
import SanitaionGuide from './tasks/guides/pdfs/sanitationgude';
import BoreholeConstGuides from './tasks/guides/boreholeguides';
import SanitationGuide from './tasks/guides/sanitationguides';
import WeeklyForm from './tasks/weeklyform';
import WeeklyForm1 from './tasks/weeklyform1';
import WeeklyForm2 from './tasks/weeklyform2';
import WeeklyForm3 from './tasks/weeklyform3';
import WeeklyForm4 from './tasks/weeklyform4';
import Welcome from './welcome';

export default Routes =(props)=>(
    <Router>
        <Scene key='root'>
        <Scene key='signin' component={Signin} title='Signin'  type='reset'  left={()=>null}/>
        <Scene key='async' component={Async} title='async' />
        <Scene key='home' component={Home} title='Home' type='reset' left={()=>null} />
        <Scene key='tasks' component={Tasks} title='Task' />
        <Scene key='taskDetails' component={TaskDetails} title='Task Details' />
        <Scene key='form' component={Form} title='Report Form'/>
        <Scene key='drafts' component={Drafts} title='Draft reports'/>
        <Scene key='draftmsg' component={DraftedMsg} title='Draft reports'/>
        <Scene key='reportslist' component={ReportsList} title='Sent reports'/>
        <Scene key='pdf1' component={Pdf1}  title='Stages of Contract'/>
        <Scene key='supervisionTem' component={SupervisionTemplate}  title='Supervision Template'/>
        <Scene key='sanitation' component={SanitaionGuide}  title='Sanitation Guide'/>
        <Scene key='borehole' component={BoreholeGuide}  title='Borehole Guide'/>        
        <Scene key='boreholeguide' component={BoreholeConstGuides}  title='Borehole Guide'/>
        <Scene key='sanitationguide' component={SanitationGuide}  title='Laterine  Guide'/>
        <Scene key='weeklyform' component={WeeklyForm} title='Weekly Report'/>
        <Scene key='weeklyform1' component={WeeklyForm1} title='Weekly Report'/>
        <Scene key='weeklyform2' component={WeeklyForm2} title='Weekly Report' left={()=>null}/>
        <Scene key='weeklyform3' component={WeeklyForm3} title='Weekly Report'left={()=>null}/>
        <Scene key='weeklyform4' component={WeeklyForm4} title='Weekly Report Summary' left={()=>null}/>
        
        <Scene key='welcome' component={Welcome}  initial={true}  left={()=>null}/>





        </Scene>
    </Router>
)