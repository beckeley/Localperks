   {/* Header */}
      <View style={styles.headerContainer}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.backAction} />
          <Appbar.Content title="All Favorites" titleStyle={styles.titleCenter} />
         
        </Appbar.Header>







        {/* Top Appbar */}
              <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="My Favorites" titleStyle={styles.titleCenter} />
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <Appbar.Action
                      icon="dots-vertical"
                      color="black"
                      onPress={() => setMenuVisible(true)}
                    />
                  }
                >
                  <Menu.Item onPress={handleShare} title="Share List" />
                  <Menu.Item onPress={() => console.log('Settings pressed')} title="Settings" />
                </Menu>
              </Appbar.Header>
        