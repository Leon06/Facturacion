import { Component } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Facturacion';

  employee = {
    name: 'John Heart',
    officeNumber: 901,
    hireDate: new Date(2012, 4, 13)
  }

  hireDateOptions = {
      disabled: true
  }

  showMessage = () => {
    notify("The button was clicked");
  }

}


