import { Dispatch, SetStateAction, useEffect } from 'react';
import { Col, Form, FormInstance, Row, Select, Switch, Typography } from 'antd';

import { POSITIONS_MAP } from '@/common/constants';
import { EnglishLevel, PositionsFilterType, Project, SeniorityLevel, Technology } from '@/types';
import { Chip, CustomButton, CustomTag } from '@/components/partials';

import styles from './PositionFilters.module.scss';

type Props = {
  form: FormInstance<PositionsFilterType>;
  initialValues: PositionsFilterType;
  projects: Project[];
  technologies: Technology[];
  englishLevelValues: EnglishLevel[];
  seniorityLevelValues: SeniorityLevel[];
  isHotChecked?: boolean;
  onFilter: (filterValue?: PositionsFilterType) => void;
  handleClearFilter: () => void;
  setEnglishLevelValues: Dispatch<SetStateAction<EnglishLevel[]>>;
  setSeniorityLevelValues: Dispatch<SetStateAction<SeniorityLevel[]>>;
  setIsHotChecked: Dispatch<SetStateAction<boolean | undefined>>;
};

export const PositionFilters = ({
  form,
  initialValues,
  projects,
  technologies,
  englishLevelValues,
  seniorityLevelValues,
  isHotChecked,
  onFilter,
  handleClearFilter,
  setEnglishLevelValues,
  setSeniorityLevelValues,
  setIsHotChecked,
}: Props) => {
  const handleFilter = async () => {
    const filterFormValues = await form.validateFields();

    if (filterFormValues) {
      onFilter(filterFormValues);
    }
  };

  const onChipClick =
    <T,>(value: T, fieldName: string, setState: Dispatch<SetStateAction<T[]>>) =>
    () => {
      const fieldValues: T[] = form.getFieldValue(fieldName);
      let result: T[];

      if (fieldValues?.length) {
        if (fieldValues.includes(value)) {
          result = fieldValues.filter((elemValue) => elemValue !== value);
        } else {
          result = [...fieldValues, value];
        }
      } else {
        result = [value];
      }

      form.setFieldsValue({ [fieldName]: result });
      setState(result);
    };

  const handleChangeSwitch = (value: boolean) => {
    setIsHotChecked(value || undefined);
    form.setFieldsValue({
      isHot: value || undefined,
    });
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);

    if (initialValues.englishLevel?.length) {
      setEnglishLevelValues(initialValues.englishLevel);
    }

    if (initialValues.seniority?.length) {
      setSeniorityLevelValues(initialValues.seniority);
    }

    if (initialValues.isHot) {
      setIsHotChecked(true);
    }
  }, [form, initialValues, setEnglishLevelValues, setIsHotChecked, setSeniorityLevelValues]);

  return (
    <div className={styles.container}>
      <Typography.Text strong className={styles.title}>
        Filters
      </Typography.Text>

      <Form form={form} layout="vertical" className={styles.form}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="technologies"
              label={<Typography.Text className={styles.inputLabel}>Technologies / Skills</Typography.Text>}
            >
              <Select
                placeholder="Select technologies / skills"
                mode="multiple"
                allowClear
                size="large"
                tagRender={CustomTag}
                className={styles.select}
              >
                {technologies.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="englishLevel"
              label={<Typography.Text className={styles.inputLabel}>English</Typography.Text>}
            >
              <Row gutter={[8, 8]}>
                {Object.entries(EnglishLevel).map(([key, value]) => (
                  <Col key={key}>
                    <Chip
                      value={value}
                      isPressed={englishLevelValues.includes(value)}
                      onClick={onChipClick(value, 'englishLevel', setEnglishLevelValues)}
                    >
                      <Typography.Text className={styles.inputLabel}>{value}</Typography.Text>
                    </Chip>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="seniority"
              label={<Typography.Text className={styles.inputLabel}>Seniority</Typography.Text>}
            >
              <Row gutter={[8, 8]}>
                {Object.entries(SeniorityLevel).map(([key, value]) => (
                  <Col key={key}>
                    <Chip
                      value={value}
                      isPressed={seniorityLevelValues.includes(value)}
                      onClick={onChipClick(value, 'seniority', setSeniorityLevelValues)}
                    >
                      <Typography.Text className={styles.inputLabel}>{value}</Typography.Text>
                    </Chip>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="type"
              label={<Typography.Text className={styles.inputLabel}>Position type</Typography.Text>}
            >
              <Select
                placeholder="Select position type"
                mode="multiple"
                allowClear
                size="large"
                tagRender={CustomTag}
                className={styles.select}
              >
                {Object.entries(POSITIONS_MAP).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="projectId"
              label={<Typography.Text className={styles.inputLabel}>Project</Typography.Text>}
            >
              <Select
                placeholder="Select project"
                allowClear
                size="large"
                tagRender={CustomTag}
                className={styles.select}
              >
                {projects.map(({ id, name, code }) => (
                  <Select.Option key={id} value={id}>
                    {name} | {code}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="isHot"
              label={<Typography.Text className={styles.inputLabel}>Hot positions</Typography.Text>}
              valuePropName="checked"
            >
              <Switch className={isHotChecked ? styles.checked : ''} onChange={handleChangeSwitch} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8} justify="space-between">
          <Col>
            <CustomButton type="text" onClick={handleClearFilter} size="large">
              Reset all filters
            </CustomButton>
          </Col>
          <Col>
            <CustomButton type="primary" onClick={handleFilter} size="large">
              Show positions
            </CustomButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
