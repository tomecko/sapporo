import { Badge, Button, Input, List, PageHeader, Tag, Typography } from 'antd';
import {
  BuildOutlined,
  BulbOutlined,
  CaretUpOutlined,
  EditOutlined,
  LinkOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { mockItems as rawItems } from './mockItems';

import './App.css';

const { Paragraph, Text } = Typography;

const sortedItems = rawItems.sort((a, b) => b.votes - a.votes);

const categoryColor: Record<string, string> = {
  'bug': 'red',
  'new feature': 'purple',
  'redesign': 'geekblue',
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(
    () => sortedItems.filter((item) =>
      [item.title, item.description].some(text => text.includes(debouncedSearchTerm))),
    [debouncedSearchTerm],
  );

  return (
    <div className="App">
      <PageHeader
        title="Sapporo Feedback & Ideas Tracker (PROTOTYPE)"
        style={{ position: 'fixed', left: 0, top: 0, right: 0, background: '#fafafa', zIndex: 1, borderBottom: '1px solid #777' }}
      >
        <Input
          allowClear
          autoFocus
          onChange={e => {
            setSearchTerm(e.currentTarget.value);
          }}
          placeholder={`search title, description, tags etc.`}
          prefix={<SearchOutlined />}
          value={searchTerm}
        />
        <div style={{ marginTop: '6px' }}>
          Show only: {}
          {[4, 3, 2, 1].map(p => <Button size="small">P{p}</Button>)}
          <span style={{ marginLeft: '15px' }} />
          {Object.keys(categoryColor).map(val =>
            <Button size="small">{val}</Button>)}{' '}
          etc.
        </div>
        <div style={{ marginTop: '10px'}}>
          <Text
            strong
          >
            Showing {filteredItems.length} of {sortedItems.length}
          </Text>
        </div>
      </PageHeader>
      <div style={{ marginTop: '180px' }}>
      </div>
      <List
        bordered
        dataSource={filteredItems}
        renderItem={item => (
          <List.Item>
            <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <CaretUpOutlined title="I like it!" />
              <Badge
                count={item.votes}
                title={`${item.votes} people voted up: person A, person B, etc.`}
              />
            </div>
            <div style={{flexGrow: 1}}>
              <Paragraph style={{ marginBottom: 0 }}>
                <strong>{item.title}</strong>{' '}
                <Badge
                  count={`P${item.priority}`}
                  style={{ backgroundColor: `#${100 - (item.priority * 22)}c` }}
                />{' '}
                <Text type="secondary">#{item.id}</Text>{' '}
                <Tag
                  color={categoryColor[item.category] ?? 'magenta'}
                  style={{marginLeft: '10px'}}
                >
                  {item.category}
                </Tag>
                <Text type="secondary">
                  {item.author}{' '}
                  {item.lastUpdate}
                </Text>
                <br/>
                {item.description}
                <br/>
                {item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                <BulbOutlined/>:{' '}
                {item.relatedItems.map(relatedItem =>
                  <a href={relatedItem} key={relatedItem} style={{ marginRight: '8px' }}>{relatedItem}</a>)}
                {' | '}
                <LinkOutlined/>:{' '}
                {item.links.map(link =>
                  <a href={link} key={link} style={{ marginRight: '8px' }}>{link}</a>)}
              </Paragraph>
            </div>
            <div>
              <BuildOutlined title="group this item with…" style={{ marginRight: '10px'}} />
              <EditOutlined/>
            </div>
          </List.Item>
        )}
        rowKey={item => String(item.id)}
      />
    </div>
  );
}

export default App;
