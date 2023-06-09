import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  title = 'Meu Perfil';

  public constructor(private titleService: Title ) { }

  public ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
