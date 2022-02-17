import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexModule } from './pokedex/pokedex.module';
import { PokegameModule } from './pokegame/pokegame.module';
import { UtilsService } from './services/utils.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PokegameModule, PokedexModule],
  providers: [UtilsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
