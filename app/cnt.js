<Container>
                 
                    <Content   theme={luckyshopTheme} > 
          <Grid>
              
             
                <Row style={styles.headRow} >
                    <Image
                    
                        style={styles.image}
                         source={require('../img/Lucky3.png')}
                      />
                </Row>

                  <Row style={styles.numbersRow}>
                   {/* <Text style={styles.result}>  {this.state.result} encounter  </Text> */}
                    <Animatable.Text ref="nums" style={styles.numbers}>  {this.state.numbers} </Animatable.Text> 
                    <Animatable.Text ref="result" style={styles.result}> {this.state.result}  same </Animatable.Text> 
                </Row>
              


               <Row style={styles.bottomRow}>
                {credit}
                {button}
                </Row>
                
          </Grid>



        <Modal style={styles.modal}
        ref={"modal1"}
        animationDuration={360}
        swipeToClose={true}
        backButtonClose={true}
        >
         
          <WinnerScreen userLoc={this.state.userLoc} />
         
        </Modal>
                  </Content>
 
              </Container>