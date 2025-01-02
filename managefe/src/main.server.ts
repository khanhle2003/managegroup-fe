import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/layout/app.component';
import { config } from './app/configs/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
