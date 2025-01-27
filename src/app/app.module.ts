import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { groupByReducer } from './store/reducers/groupBy.reducer';
import { GroupingEffects } from './store/effects/groupBy.effects';
import { OrderingEffects } from './store/effects/orderBy.effects';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { orderByReducer } from './store/reducers/orderBy.reducer';
import { BoardlistComponent } from './boardlist/boardlist.component';
import { HttpClientModule } from '@angular/common/http';
import { ticketsReducer } from './store/reducers/tickets.reducer';
import { TicketsEffects } from './store/effects/tickets.effects';
import { usersReducer } from './store/reducers/users.reducer';
import { UsersEffects } from './store/effects/users.effects';
import { BoardmainComponent } from './boardmain/boardmain.component';
import { BoardcardComponent } from './boardcard/boardcard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BoardlistComponent,
    BoardmainComponent,
    BoardcardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({selectedData: groupByReducer, selectedOrderByData: orderByReducer, ticketsData: ticketsReducer, usersData: usersReducer}),
    EffectsModule.forRoot([GroupingEffects, OrderingEffects, TicketsEffects, UsersEffects]),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
